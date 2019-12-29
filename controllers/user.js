'use strict'

const User = require(`../models/user`);
const service = require(`../services/token`);
const bcrypt = require('bcrypt-nodejs');
const mongodb = require('../services/mongoConnect');

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    });

    mongodb.connectMDB();
    user.save((err) => {
        if (err) {
            mongodb.desconectMDB();
            return res.status(500).send({code: 1, message: `error al crear al usuario: ${err}`})
        }
        mongodb.desconectMDB();
        return res.status(201).send({ code: 0, message: `usuario creado`, token: service.createToken(user)})
    })
}

function signIn(req, res) {
    
    mongodb.connectMDB();
    User.findOne({email: req.body.email }, (err, user) => {
        if (err) {
            mongodb.desconectMDB();
            return res.status(500).send({code: 1, message: `error al consultar al usuario: ${err}`})
        }
        if (!user) {
            mongodb.desconectMDB();
            return res.status(404).send({code: 1, message: `no existe el usuario`})
        }
        
        mongodb.desconectMDB();
        if(bcrypt.compareSync(req.body.password, user.password)) { 
            user.password = null;
            return res.status(200).send({code: 0, message: `te has logeado correctamente `, token: service.createToken(user), user})
        } else {
            return res.status(401).send({code: 1, message: `password es incorrecto ` })
        }
        
    })

}


module.exports = {
    signUp,
    signIn
}