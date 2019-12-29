'use strict'

const config = require('../config');
const mongoose = require('mongoose');

function connectMDB() {

  mongoose.connect(config.db, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, (err) => {
      if (err) {
          return console.log(`Error al conectar a la bases de datos ${err}`);
      }
    //   console.log('Conexion a la base de datos');
  });

}
function desconectMDB() {
    // console.log('Conexion a la base de datos Cerrada');
    return mongoose.connection.close();
}

module.exports = {
    connectMDB,
    desconectMDB
}