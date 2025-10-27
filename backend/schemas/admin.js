const Joi = require("joi");

const adminSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string(),
  expires_in: Joi.number(),
});

module.exports = { adminSchema };
