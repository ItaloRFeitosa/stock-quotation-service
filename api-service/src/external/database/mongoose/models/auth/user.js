const { Schema, model, models } = require("mongoose");
const { required, toObject } = require("../../helpers");

const UserSchema = new Schema(
  {
    email: { ...required(String), unique: true },
    password: required(String),
    role: required(String),
  },
  {
    timestamps: true,
    toObject,
  }
);
const User = models.User || model("User", UserSchema);

module.exports = { User };
