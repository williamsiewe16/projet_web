let express = require('express')
let UserController = require('../controllers/UserController');
let FilmController = require('../controllers/FilmController');
let checkAuth = require('../middlewares/check-auth');
const bcrypt = require('bcrypt')

let router = (() => {
    let router = express.Router()


   // router.route('/test').get(UserController.test)

    /****  UserController
     * Certaines routes sont protégées par un middleware d'authentification
     */

    /** connexion */
    router.route('user/login').post(UserController.login)

    /** Inscription */
    router.route('user/register').post(UserController.register)

    /** Récupération de l'utilisateur connecté */
    router.route('user/me').get(checkAuth,UserController.me)

    /** Récupération des likes d'un utilisateur */
    router.route('/user/likes').get(/*checkAuth,*/ UserController.likes)

    /** Récupération des déceptions d'un utilisateur */
    router.route('/user/deceptions').get(/*checkAuth,*/ UserController.deceptions)


    /****  FilmController
     * La plupart de ces routes sont protégées par un middleware d'authentification
     */

    /** Récupération de la liste des films */
    router.route('/film/all').get(FilmController.all)

    /** Récupération d'un film */
    router.route('/film/:id').get(FilmController.one)

    /** Liker un film */
    router.route('/film/:id/like').post(checkAuth,FilmController.like)

    /** Ne plus liker un film */
    router.route('/film/:id/dislike').delete(checkAuth,FilmController.dislike)

    /** Noter un film */
    router.route('/film/:id/rate').put(/*checkAuth,*/FilmController.rate)

    /** Ajouter un film à sa liste de déceptions */
    router.route('/film/:id/addToDeception').post(checkAuth,FilmController.addToDeception)

    /** Retirer un film de sa liste de déceptions */
    router.route('/film/:id/removeFromDeception').delete(checkAuth,FilmController.removeFromDeception)

    return router
})()

module.exports = router
