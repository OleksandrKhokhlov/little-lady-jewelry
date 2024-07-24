const Joi = require("joi");

const adminSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string(),
});

module.exports = { adminSchema };
