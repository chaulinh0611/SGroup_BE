const Joi = require('joi');

exports.voteSchema = Joi.object({
  optionId: Joi.string().required(),
});

exports.unvoteSchema = Joi.object({
  optionId: Joi.string().required(),
});
