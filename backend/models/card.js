const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина "name": 2'],
      maxlength: [30, 'Максимальная длина "name": 30'],
      required: [true, 'Обязательное поле "name"'],
    },
    link: {
      type: String,
      required: [true, 'Обязательное поле "link"'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Неверный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('card', cardSchema);
