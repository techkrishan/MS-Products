const Joi = require("joi");

const slugRegexPattern = '^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$';

const productValidator = {
  title: Joi.string().max(150).required(),
  slug: Joi.string().max(150).required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().required(),
};

module.exports = {
  addProductValidator: Joi.object().keys(productValidator),
  editProductValidator: Joi.object().keys({...productValidator, id: Joi.string().required()}),
  viewProductValidator: Joi.object().keys({
    slug: Joi.string().trim().max(150).pattern(new RegExp(slugRegexPattern)).required(),
  }),
};
