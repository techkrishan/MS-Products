const logs = require("../logs");

const successResponse = async (res, responseData) => {
  const response = {
    status: true,
    message: responseData.message ?? "OK",
  };

  if (responseData.data) {
    response.data = responseData.data;
  }

  return res.status(responseData.statusCode ?? 200).json(response);
};

const errorResponse = async (err, res, methodName = "") => {
  const error = {};
  const statusCode = err.status || 500;
  error.status = false;
  if (err.jwt_expired) {
    error.jwt_expired = err.jwt_expired;
  }
  error.message = err.message;
  logs("error", methodName, error.message);
  return res.status(statusCode).json(error);
};

module.exports = {
  successResponse,
  errorResponse,
};
