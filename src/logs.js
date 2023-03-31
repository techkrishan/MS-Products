const pino = require("pino");
const { LOG_LEVEL, ENABLE_LOGGING, MAX_LOGS } = require("./config");

const levels = {
  crit: 60,
  error: 50,
  warn: 40,
  info: 20,
};

let rotatingLogStream = require("file-stream-rotator").getStream({
  filename: `${__dirname}/logs/app-info`,
  frequency: "daily",
  date_format: "YYYY-MM-DD",
  extension: ".log",
  max_logs: parseInt(MAX_LOGS),
});

const streams = Object.keys(levels).map((level) => {
  return {
    level,
    stream: rotatingLogStream,
  };
});

const logger = pino(
  {
    level: LOG_LEVEL,
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
    enabled: ENABLE_LOGGING,
  },
  pino.multistream(streams, { levels, dedupe: true })
);

const logs = (level, methodName, message) =>
  logger[level](`From - [${methodName}] - ${message}`);

module.exports = logs;
