require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const routerSignup = require('./routes/signup');
const routerSignin = require('./routes/signin');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000, MESTO_DB = 'mongodb://0.0.0.0:27017/mestodb' } =
  process.env;

const app = express();

app.use(cors());

mongoose.connect(MESTO_DB, {
  useNewUrlParser: true,
});

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
});

app.use(requestLogger);
app.use(limiter);

app.use('/signup', routerSignup);
app.use('/signin', routerSignin);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use('*', (req) => {
  throw new NotFoundError(`страница по адресу ...${req.params[0]} не найдена`);
});

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
