const https = require("https");
const { promisify } = require("util");
const { pipeline, Writable } = require("stream");
const pipelineAsync = promisify(pipeline);

const { CSVParserStream } = require("../csv/fast-csv")

const stooqUrl = (symbol) =>
  `https://stooq.com/q/l/?s=${symbol}&f=sd2t2ohlcvn&h&e=csv`;


const sanitizeStooqQuote = (memo, [key, value]) => ({
  ...memo,
  [key.toLowerCase()]: isNaN(value) ? value : Number(value),
});

const WriteQuotes = (result) =>
  new Writable({
    objectMode: true,
    write: (chunk, _, cb) => {
      const isInvalidQuote = chunk.Close === "N/D"
      if(isInvalidQuote){
        return cb()
      }
      const transformed = Object.entries(chunk).reduce(sanitizeStooqQuote, {});
      result.push(transformed);
      cb();
    },
  });

const StooqStockProvider = () => ({
  fetchQuote: async (symbol) => {
    const response = await new Promise((resolve) =>
      https.get(stooqUrl(symbol), (response) => {
        if (response.statusCode >= 400) {
          return resolve(null);
        }

        return resolve(response);
      })
    );

    if (!response) {
      return null;
    }

    const result = [];

    await pipelineAsync(
      response,
      CSVParserStream(),
      WriteQuotes(result)
    );

    if (!result.length) {
      return null;
    }

    return result[0];
  },
});

module.exports = { StooqStockProvider };
