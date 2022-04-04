const { Schema, model, models } = require("mongoose");
const { toObject } = require("../../helpers");

const StockStatsSchema = new Schema(
  {
    stock: {
      type: String,
      unique: true,
      required: true
    },
    timesRequested: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
    toObject,
  }
);
const StockStats =
  models.StockStats || model("StockStats", StockStatsSchema);

module.exports = { StockStats };
