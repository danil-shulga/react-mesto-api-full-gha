const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");

const createErrorMessageCards = (req, res, err, next) => {
  switch (err.name) {
    case 'ValidationError':
      next(new BadRequestError(err.message));
      break;

    case 'CastError':
      next(new BadRequestError(`Некорректный id: ${req.params.id}`));
      break;

    case 'DocumentNotFoundError':
      next(new NotFoundError(`Карточка с id: ${req.params.id} не найдена`));
      break;

    default:
      next(err);
  }
};

module.exports = createErrorMessageCards