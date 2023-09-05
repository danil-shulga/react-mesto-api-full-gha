const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const createErrorMessageCards = require('../utils/createErrorMessageCards');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => createErrorMessageCards(req, res, err, next));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ owner: req.user.id, name, link })
    .then((card) => res.status(201).send(card))
    .catch((err) => createErrorMessageCards(req, res, err, next));
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail()
    .then((card) => {
      if (!card.owner.equals(req.user.id))
        throw new ForbiddenError('Можно удалять только свои карточки');

      Card.deleteOne(card)
        .orFail()
        .then(() =>
          res.send({ message: `Карточка с id: ${req.params.id} удалена` })
        )
        .catch((err) => createErrorMessageCards(req, res, err, next));
    })
    .catch((err) => createErrorMessageCards(req, res, err, next));
};

const addLikeCard = (req, res, next) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user.id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => createErrorMessageCards(req, res, err, next));
};

const removeLikeCard = (req, res, next) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(id, { $pull: { likes: req.user.id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => createErrorMessageCards(req, res, err, next));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  removeLikeCard,
};
