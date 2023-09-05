const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина "name": 2'],
      maxlength: [30, 'Максимальная длина "name": 30'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина "about": 2'],
      maxlength: [30, 'Максимальная длина "about": 30'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Некорректный URL',
      },
    },
    email: {
      type: String,
      required: [true, 'Поле "Email" обязательное'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Некорректный Email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "Password" обязательное'],
      select: false,
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredential = function findUserByCredential(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError('Неверная почта или пароль');
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) throw new UnauthorizedError('Неверная почта или пароль');
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
