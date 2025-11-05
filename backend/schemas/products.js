const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string(),
  images: Joi.array().items(Joi.string()),
  video: Joi.string(),
  price: Joi.number(),
  type: Joi.string().valid(
    "пусети на заглушках",
    "пусети на закрутках",
    "англійський замок",
    "конго"
  ),
  material: Joi.string(),
  insert: Joi.string(),
  weight: Joi.number(),
  dimensions: Joi.object({ height: Joi.number(), width: Joi.number() }),
  quantity: Joi.number(),
});

const updateQuantitySchema = Joi.object({
  quantity: Joi.number().required(),
});

const updatePriceSchema = Joi.object({
  price: Joi.number().required(),
});

const orderedSchema = Joi.object({
  comment: Joi.string().allow(""),
  counts: Joi.object(),
  delivery: Joi.string().valid("Нова пошта", "Укрпошта"),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  telephone: Joi.string().required(),
  payment: Joi.string().valid("Онлайн", "Післяплата"),
  totalPrice: Joi.number().required(),
  town: Joi.string().required(),
  warehouse: Joi.string(),
});

module.exports = {
  productSchema,
  updateQuantitySchema,
  updatePriceSchema,
  orderedSchema,
};
