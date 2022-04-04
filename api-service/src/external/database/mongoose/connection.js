const { connect, connection, disconnect } = require("mongoose");

const stage =  process.env.NODE_ENV || "development"

const databaseName = {
  development: "api-service-dev",
  test: "api-service-test",
}

const localhostUrl =
  `mongodb://root:mongo@localhost:27017/${databaseName[stage]}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

const mongoUri = process.env.MONGO_URI || localhostUrl;

const isConnected = () => connection.readyState === 1;

const createConnection = (uri = mongoUri) => {
  return connect(uri);
};

module.exports = { isConnected, createConnection, disconnect };
