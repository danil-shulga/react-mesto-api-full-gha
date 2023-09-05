const { SECRET_KEY = 'secretKey' } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const createErrorMessageUsers = require('../utils/createErrorMessageUsers');

const createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10).then((hash) => hash);

  User.create({ name, about, avatar, email, password: hashPassword })
    .then((user) => {
      delete user._doc.password; // eslint-disable-line
      res.status(201).send(user);
    })
    .catch((err) => {
      createErrorMessageUsers(req, res, err, next);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => createErrorMessageUsers(req, res, err, next));
};

const getMeInfo = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => res.send(user))
    .catch((err) => createErrorMessageUsers(req, res, err, next));
};

const getUserById = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => createErrorMessageUsers(req, res, err, next));
};

const editUser = (req, res, next) => {
  const { id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => createErrorMessageUsers(req, res, err, next));
};

const editUserAvatar = (req, res, next) => {
  const { id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => createErrorMessageUsers(req, res, err, next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredential(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => createErrorMessageUsers(req, res, err, next));
};

module.exports = {
  createUser,
  login,
  getUsers,
  getMeInfo,
  getUserById,
  editUser,
  editUserAvatar,
};
