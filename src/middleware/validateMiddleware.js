const { VALIDATION_ERROR } = require("../messages/validationMessages");

const validateMiddleware = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property], { abortEarly: false });
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    let errorList = [];
    details.map((err) => {
      errorList[err.context.key] = err.message.replace(/['"]+/g, "");
      return true;
    });
    errorList = { ...errorList };
    res
      .status(422)
      .json({
        status: false,
        message: VALIDATION_ERROR,
        errors: errorList,
      });
  }
};
module.exports = validateMiddleware;
