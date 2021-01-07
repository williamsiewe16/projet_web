let express = require('express')
const axios = require('axios')
const SERVER = "http://localhost:3000"
/**
 * initialisation de la connexion au postgres
 */
const { Client } = require('pg')
const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
})
client.connect()


module.exports = {
    /* Cette méthode récupère et renvoie la liste des films dans la base de données */
    all: async (req,res,next) => {
        let result = await client.query({ // notez le "await" car la fonction est asynchrone
            text: "SELECT * FROM films",
        })
        res.status(200).json(result.rows)
    },

    like: async (req,res,next) => {
        //récupération du user connecté
        let user = req.user
        let filmId = req.params.id

        // On teste si le film existe. Si oui on ajoute une ligne dans la table likes
        axios.get(`${SERVER}/api/film/${filmId}?check=true`)
            .then(async response => {
                let result = await client.query({ // notez le "await" car la fonction est asynchrone
                    text: "INSERT INTO likes (user_id,film_id) VALUES ($1,$2)",
                    values: [user.id, filmId]
                })
                res.status(200).json({})
            })
            .catch((err) => {
                res.status(err.response.status).json(err.response.data)
            })
    },
    dislike: async (req,res,next) => {
        //récupération du user connecté
        let user = req.user
        let filmId = req.params.id

        // On teste si le film existe. Si oui on retire une ligne dans la table likes
        axios.get(`${SERVER}/api/film/${filmId}?check=true`)
            .then(async response => {
                let result = await client.query({ // notez le "await" car la fonction est asynchrone
                    text: "DELETE FROM likes WHERE user_id=$1 AND film_id=$2",
                    values: [user.id, filmId]
                })
                res.status(200).json({})
            })
            .catch((err) => {
                res.status(err.response.status).json(err.response.data)
            })
    },
    rate: async (req,res,next) => {
        //récupération du user connecté
        let user = req.user
        let filmId = req.params.id
        let rating = req.body.rating

        /* On teste si le film existe. */
        axios.get(`${SERVER}/api/film/${filmId}?check=true`)
            .then(async response => {
                /*
                 Si le l'utilisateur n'a pas encore noté ce film, une ligne est ajoutée dans la
                 table ratings. Sinon la note donnée précédemment par l'utilisateur est modifiée par la nouvelle
                */
                let queries = {
                    insert: "INSERT INTO ratings (user_id,film_id,rating) VALUES ($1,$2,$3)",
                    update: "UPDATE ratings SET rating=$3 WHERE user_id=$1 AND film_id=$2"
                }
                let result1 = await client.query({ // notez le "await" car la fonction est asynchrone
                    text: "SELECT * FROM ratings WHERE user_id=$1 AND film_id=$2",
                    values: [user.id, filmId]
                })
                let result2 = await client.query({ // notez le "await" car la fonction est asynchrone
                    text: result1.rows.length == 0 ? queries.insert : queries.update,
                    values: [user.id, filmId, rating]
                })
                res.status(200).json({})
            })
            .catch((err) => {
                res.status(err.response.status).json(err.response.data)
            })
    },
    addToDeception: async (req,res,next) => {
        //récupération du user connecté
        let user = req.user
        let filmId = req.params.id

        /* On teste si le film existe. Si oui, on ajoute une ligne dans la table deceptions*/
        axios.get(`${SERVER}/api/film/${filmId}?check=true`)
            .then(async response => {
                let result = await client.query({ // notez le "await" car la fonction est asynchrone
                    text: "INSERT INTO deceptions (user_id,film_id) VALUES ($1,$2)",
                    values: [user.id, filmId]
                })
                res.status(200).json({})
            })
            .catch((err) => {
                res.status(err.response.status).json(err.response.data)
            })
    },
    removeFromDeception: async (req,res,next) => {
        //récupération du user connecté
        let user = req.user
        let filmId = req.params.id

        /* On teste si le film existe. Si oui, on retire  une ligne de la table deceptions*/
        axios.get(`${SERVER}/api/film/${filmId}?check=true`)
            .then(async response => {
                let result = await client.query({ // notez le "await" car la fonction est asynchrone
                    text: "DELETE FROM deceptions WHERE user_id=$1 AND film_id=$2",
                    values: [user.id, filmId]
                })
                res.status(200).json({})
            })
            .catch((err) => {
                res.status(err.response.status).json(err.response.data)
            })
    },

    /* On récupère le film qui à l'id passé en paramètre */
    one: async (req,res,next) => {
        let id = req.params.id

        // La variable check permet juste de savoir si on besoin de récupérer la note du film ou pas
        let check = req.query.check
        let result = await client.query({ // notez le "await" car la fonction est asynchrone
            text: "SELECT * FROM films WHERE id=$1",
            values: [id]
        })
        let film = result.rows[0]
        if(film == undefined)
            res.status(422).json({error: "Ce film n'existe pas"})
        else{
            if(!check){
                // On calcule la note du film en faisant la moyenne des notes données par chaque utilisateur
                let result = await client.query({ // notez le "await" car la fonction est asynchrone
                    text: "SELECT film_id, AVG(rating) as note, count(*) as nombreNotes FROM ratings WHERE film_id=$1 GROUP BY film_id",
                    values: [film.id]
                })
                film.note = result.rows[0] ? Math.round(result.rows[0].note*100)/100 : 0
                film.nombrenotes = result.rows[0] ? result.rows[0].nombrenotes : 0
            }
            res.status(200).json(film)
        }
    },


}
