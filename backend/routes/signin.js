const routerSignin = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const { login } = require('../controllers/users')


routerSignin.use('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2)
  })
}), login)

module.exports = routerSignin
