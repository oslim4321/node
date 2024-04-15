const express = require('express');
const {getAllUsers, createNewUser} = require('../controller/user');
const route = express.Router();


route.get("/getAllUser", getAllUsers);
route.post('/createNewUser', createNewUser)

module.exports = route;