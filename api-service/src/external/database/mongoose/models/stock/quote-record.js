const { Schema, model, models } = require("mongoose");
const { required, toObject } = require("../../helpers");

const QuoteRecordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: required(String),
    symbol: required(String),
    open: required(Number),
    high: required(Number),
    low: required(Number),
    close: required(Number),
    createdAt: required(Date),
  },
  {
    timestamps: false,
    toObject,
  }
);
const QuoteRecord =
  models.QuoteRecord || model("QuoteRecord", QuoteRecordSchema);

module.exports = { QuoteRecord };
