'use strict'

const jwt = require(`jwt-simple`);
const moment = require(`moment`);
const config = require(`../config`);


function createToken(user) {

    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, `days`).unix(),
    }

   return jwt.encode(payload, config.SECRET_TOKEN)
    
}

function decodeToken(token) {

    const decoded = new Promise((resolve, reject) => {

        try {

            const payload = jwt.decode(token, config.SECRET_TOKEN);

            if (payload.exp <= moment().unix()) {
                // return resolve.status(401).send({ code: 1, message: `el token a expirado`});
                reject({ 
                    status: 401,
                    code: 1,
                    message: `el token a expirado`
                });
            }

            resolve(payload.sub);

        } catch (err) {
            reject({
                status: 500,
                code: 1,
                message: `invalid token`
            })
        }



    });

    return decoded;
    
}

module.exports = {
    createToken,
    decodeToken
}