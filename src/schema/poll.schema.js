const Joi = require('joi');

exports.createPollSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  options: Joi.array().items(Joi.string().required()).min(2).required(),
  expiresAt: Joi.date().optional(),
});

exports.updatePollSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  expiresAt: Joi.date().optional(),
});
