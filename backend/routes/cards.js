const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const UrlRegexp = require('../utils/constants');

const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  removeLikeCard,
} = require('../controllers/cards');

routerCards.get('/', getCards);

routerCards.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(UrlRegexp),
    }),
  }),
  createCard
);

routerCards.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteCard
);
routerCards.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  })
}), addLikeCard);

routerCards.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  })
}), removeLikeCard);

module.exports = routerCards;
