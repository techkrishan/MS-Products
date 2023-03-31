const mongoose = require("mongoose");
const { DB_URI, IS_DEBUG } = require("../config");
const logs = require("../logs");

const connectToDatabase = async () => {
  try {
    logs("info", "DB Connection", `Connecting to db  + ${DB_URI}`);
    await mongoose.connect(DB_URI, {});
    mongoose.set("strictQuery", true);
    mongoose.set("debug", (collectionName, method, query, doc) => {
      IS_DEBUG &&
        logs(
          "info",
          "[MongoDb]",
          `${collectionName}-${method} info ${JSON.stringify({ query, doc })}`
        );
    });
    logs("info", "DB Connection", "Db Connected");
  } catch (err) {
    logs(
      "info",
      "[DB Connection]",
      "============Error in DB Connection============"
    );
    const errorMessage = err.stack || err;
    logs("error", "DB Connection", `Error ${errorMessage}`);
    process.exit(1);
  }
};

module.exports = connectToDatabase;