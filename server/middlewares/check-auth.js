const { Client } = require('pg')
const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
})
client.connect()

/*
Ce middleware permet de vérifier si un utilisateur est connecté, et si oui, cet utilisateur
sera accessible dans req.user
 */
module.exports = async (req, res, next) => {
    let id = req.session.userId
    const result = await client.query({ // notez le "await" car la fonction est asynchrone
        text: 'SELECT id,pseudo,email FROM users WHERE id=$1',
        values: [id]
    })
    if(result.rows.length == 0)
        res.status(401).json({error: "Aucun utilisateur connecté"})
    else{
        req.user = result.rows[0]
        next()
    }
}
