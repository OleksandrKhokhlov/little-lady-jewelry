const { HttpError } = require("../helpers");
const validTypes = [
  "пусети на заглушках",
  "пусети на закрутках",
  "англійський замок",
  "конго",
];

const isValidType = (req, res, next) => {
  const { productType } = req.query;
  if (!validTypes.includes(productType)) {
    return next(HttpError(400, `${productType} is not valid type`));
  }
  next();
};

module.exports = isValidType;
