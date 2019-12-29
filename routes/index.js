'use strict'

const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth')

// Controllers
const productCtrl = require('../controllers/products');
const userCtrls = require('../controllers/user');

// api prodcutos
api.get('/products', auth, productCtrl.getProducts);


// api users
api.post('/signUp', userCtrls.signUp);
api.post('/signIn', userCtrls.signIn);


module.exports = api;