const uuidHash = require("uuid-by-string");

function encryptString(stringToEncrypt) {
  console.log(`Encrypted key = ${uuidHash(stringToEncrypt)}`);
  return uuidHash(stringToEncrypt);
}

module.exports.encryptString = encryptString;
