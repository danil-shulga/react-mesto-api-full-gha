const { celebrate, Joi } = require('celebrate');
const routerUsers = require('express').Router();
const UrlRegexp = require('../utils/constants');

const {
  getUsers,
  getMeInfo,
  getUserById,
  editUser,
  editUserAvatar,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/me', getMeInfo);

routerUsers.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  getUserById
);

routerUsers.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  editUser
);

routerUsers.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(UrlRegexp),
    }),
  }),
  editUserAvatar
);

module.exports = routerUsers;
