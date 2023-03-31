const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { PORT } = require("./config");
const routes = require("./routes");
const app = express();
const logs = require("./logs");

app.set("port", PORT);
app.set("trust proxy", true);
app.disable("etag").disable("x-powered-by");
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function (_req, res, next) {
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("Cache-Control", "no-store");
  res.header("Pragma", "no-cache");
  next();
});
app.use(cors());

// Connect to database
const connectToDatabase = require("./database");
connectToDatabase().then(() => {
  routes(app);

  app.listen(PORT, () => {
    console.log(
      `${process.env.APP_NAME} is running at http://localhost:${PORT}`
    );
  });
});

process.on("uncaughtException", async (err) => {
  logs("error", "[main]", `There was an uncaught error: => ${err}`);
  process.exit(1);
});

process.on("unhandledRejection", async (reason, p) => {
  logs(
    "error",
    "[main]",
    `Unhandled Rejection at: ${JSON.stringify(p)}, reason:, ${
      reason.stack || reason
    }`
  );
  process.exit(1);
});

module.exports = app;
