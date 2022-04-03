const bcrypt = require("bcrypt");
const defaultSaltRounds = 10;

function genSalt(rounds) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, (err, salt) => {
      if (err) return reject(err);
      return resolve(salt);
    });
  });
}

async function compare(unhashed, hash) {
  return bcrypt.compare(unhashed, hash);
}

async function hash(toBeHashed, saltRounds = defaultSaltRounds) {
  const salt = await genSalt(saltRounds);
  return new Promise((resolve, reject) => {
    bcrypt.hash(toBeHashed, salt, function (err, hash) {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
}

module.exports = { hash, compare };
