const routerSignup = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const { createUser } = require('../controllers/users')
const UrlRegexp = require('../utils/constants')


routerSignup.use('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(UrlRegexp),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  })
}), createUser)

module.exports = routerSignup
