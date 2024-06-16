const { HttpError } = require("../helpers");
const type = [
  "пусети на заглушках",
  "пусети на закрутках",
  "англійський замок",
  "конго",
];

const isValidType = (req, res, next) => {
  const { productType } = req.params;
  if (type.indexOf(productType) === -1) {
    next(HttpError(400, `${productType} is not valid type`));
  }
  next();
};

module.exports = isValidType;
