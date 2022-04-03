const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const FIFTEEN_MINUTES = 15 * 60;

const loadFile = (filename) =>
  fs.readFileSync(path.join(__dirname, ".", filename)).toString("utf-8");

const privateKey = process.env.JWT_PRIVATE_KEY || loadFile("private.pem");

const publicKey = process.env.JWT_PUBLIC_KEY || loadFile("public.pem");

const passphrase = process.env.JWT_PASSPHRASE || loadFile("passphrase.txt");

const expiresInSeconds = parseInt(process.env.JWT_EXPIRES) || FIFTEEN_MINUTES;

const sign = async (data) => {
  const issuedAt = new Date();
  const expiresIn = new Date();

  const accessToken = await new Promise((resolve, reject) => {
    return jwt.sign(
      data,
      { key: privateKey, passphrase: passphrase },
      { algorithm: "RS256", expiresIn: expiresInSeconds },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });

  expiresIn.setSeconds(issuedAt.getSeconds() + expiresInSeconds);

  return {
    type: "Bearer",
    accessToken,
    expiresIn: expiresIn.toISOString(),
    issuedAt: issuedAt.toISOString(),
  };
};

const verifyAndDecode = (token) =>
  new Promise((resolve, reject) => {
    return jwt.verify(
      token,
      publicKey,
      { algorithms: ["RS256"] },
      (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      }
    );
  });

module.exports = { sign, verifyAndDecode };
