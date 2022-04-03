const { connect, connection } = require("mongoose");

const localhostUrl =
  "mongodb://root:mongo@localhost:27017/api-service-dev?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const mongoUri = process.env.MONGO_URI || localhostUrl;

const isConnected = () => connection.readyState === 1;

const createConnection = (uri = mongoUri) => {
  return connect(uri);
};

module.exports = { isConnected, createConnection };
