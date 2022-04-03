const csv = require("fast-csv");

const CSVParserStream = () =>
  csv.parse({ objectMode: true, headers: true });

module.exports = { CSVParserStream }
