const bcrypt = require('bcrypt')
const axios = require('axios')
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
    register: async(req,res) => {
        // Récupération des informations des utilisateurs
        let pseudo = req.body.pseudo
        let email = req.body.email
        let password = req.body.password

        // Si l'email ou le pseudo n'est pas encore utilisé, l'utilisateur est créé
        const result = await client.query({ // notez le "await" car la fonction est asynchrone
            text: 'SELECT email FROM users WHERE email=$1 or pseudo=$2',
            values: [email, pseudo]
        })

        if(result.rows.length != 0)
            res.status(400).json({error: "Cet email ou ce pseudo existe déjà"})
        else{
            let hashedPassword = await bcrypt.hash(password,10)
            await client.query({ // notez le "await" car la fonction est asynchrone
                text: "INSERT INTO users (pseudo,email,password) VALUES ($1,$2,$3)",
                values: [pseudo,email,hashedPassword]
            })
            let result = await client.query({ // notez le "await" car la fonction est asynchrone
                text: "SELECT * FROM users ORDER BY id DESC LIMIT 1",
            })
            //Création de la session
            req.session.userId = result.rows[0].id
            req.session.save()
            res.status(200).json({message: "Utilisateur enregistré avec succès"})
        }

    },
    login: async(req,res) => {
        // Récupération des informations des utilisateurs
        let email = req.body.email
        let password = req.body.password

        // Si l'email ou le pseudo n'est pas encore utilisé, l'utilisateur est créé
        const result = await client.query({ // notez le "await" car la fonction est asynchrone
            text: 'SELECT id,email,password FROM users WHERE email=$1',
            values: [email]
        })

        if(result.rows.length == 0){
            res.status(401).json({error: "Cet utilisateur n'existe pas"})
        }else{
            let user = result.rows[0]
            if (await bcrypt.compare(password, user.password)) {
                if(req.session.userId != undefined)
                    res.status(401).json({error: "Vous êtes déjà connecté"})
                else{
                    //Création de la session
                    req.session.userId = user.id
                    req.session.save()
                    res.status(200).json({message: "Authentification réussie"})
                }
            } else {
                res.status(401).json({error: "Mot de passe incorrect"})
            }
        }
    },
    logout: async(req,res) => {
        req.session.destroy()
        res.send({})
    },
    me: async (req, res) => {
        // l'utilisateur est renvoyé
        res.status(200).json(req.user)
    },
    likes: async (req,res,next) => {
        //récupération du user connecté
        let user = req.user

        // Récupération de la liste des favoris d'un utilisateur
        let result = await client.query({ // notez le "await" car la fonction est asynchrone
            text: "SELECT film_id FROM likes WHERE user_id=$1",
            values: [user.id]
        })
        res.status(200).json(result.rows)
    },
    deceptions: async (req,res,next) => {
        //récupération du user connecté
        let user = req.user

        // Récupération de la liste des déceptions d'un utilisateur
        let result = await client.query({ // notez le "await" car la fonction est asynchrone
            text: "SELECT film_id FROM deceptions WHERE user_id=$1",
            values: [user.id]
        })

        res.status(200).json(result.rows)
    },
    test: async (req,res,next) => {
        let request = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=3b34b50322e1f7ca8e68e085ef754a9d&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=1")
        let films = request.data.results
        for(let film of films){
            film["overview"].replace('’',"'")
            let result = await client.query({ // notez le "await" car la fonction est asynchrone
                text: "INSERT INTO films (posterimage,overview,releasedate,backdropimage,title) VALUES ($1,$2,$3,$4,$5)",
                values: [film["poster_path"], film["overview"], film["release_date"], film["backdrop_path"], film["title"]],
            })
        }
    }

}
