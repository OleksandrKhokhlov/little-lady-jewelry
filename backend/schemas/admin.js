const Joi = require("joi");

const adminShema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { adminShema };
