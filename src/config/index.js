require("dotenv").config();
const CustomError = require("../utils/customError");
const { UN_PROCESSABLE_ENTITY } = require("../constants/statusCodes");
const env = process.env;

if (!env.EXEC_ENV || !env.MONGODB_URI) {
  throw new CustomError(
    UN_PROCESSABLE_ENTITY,
    "EXEC_ENV or MONGODB_URI value is not defined in environment"
  );
}

module.exports = {
  APP_NAME: env.APP_NAME ?? 'Service name',
  PORT: env.PORT ?? 8081,
  EXEC_ENV: env.EXEC_ENV,
  DB_URI: env.MONGODB_URI ?? null,
  IS_DEBUG: env.IS_DEBUG ?? false,
  LOG_LEVEL: env.LOG_LEVEL ?? 'info',
  ENABLE_LOGGING: env.ENABLE_LOGGING ?? false,
  MAX_LOGS: env.MAX_LOGS ?? 5,
};
