const express = require('express')

const authRouter = express.Router()
// const User = require('./../models/user.model')
const { register, login, authenticate, logout } = require('./../controllers/auth.controller')

authRouter.post('/login', login)

authRouter.get('/logout', authenticate, logout)
// authRouter.post('/register', register)

module.exports = authRouter
