const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");

const createErrorMessageUsers = (req, res, err, next) => {
  switch (err.name) {
    case 'ValidationError':
      next(new BadRequestError(err.message));
      break;

    case 'CastError':
      next(
        new BadRequestError(`Некорректный id: ${req.params.id || req.user.id}`)
      );
      break;

    case 'DocumentNotFoundError':
      next(
        new NotFoundError(
          `Пользователь с id: ${req.params.id || req.user.id} не найден`
        )
      );
      break;

    default:
      if (err.code === 11000)
        next(new ConflictError(`Email: ${req.body.email} уже используется`));
      else next(err);
  }
};

module.exports = createErrorMessageUsers