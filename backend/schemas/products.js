const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string(),
  images: Joi.array().items(Joi.object()),
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

module.exports = { productSchema, updateQuantitySchema, updatePriceSchema };
