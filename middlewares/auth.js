'use strict'

const service = require('../services/token')

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ code: 3, message: `no tiene autorizacion `})
    }

    const token = req.headers.authorization.split(' ')[1];

    service.decodeToken(token)
    .then((res) => {
        req.user = res;
        next();
    })
    .catch((err) => {
        return res.status(err.status).send({code: err.code, message: err.message });
    })
  
}

module.exports = isAuth;
