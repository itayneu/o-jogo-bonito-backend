const { create } = require("./dbCommunication");
const { encryptString } = require("../services/encryptData");

/**
 * The function create user object in db
 * @param {userJson} userJsonObject
 */
async function createUser(userJsonObject) {
  const result = await create(
    `user:${encryptString(`${userJsonObject["username"]}`)}`,
    userJsonObject
  )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  return result;
}

/**
 * The function creates item object in db
 * @param {itemJson} itemJsonObject
 */
async function createItem(itemJsonObject) {
  const result = await create(
    `item:${itemJsonObject["itemId"]}`,
    itemJsonObject
  )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  return result;
}

module.exports.createUser = createUser;
module.exports.createItem = createItem;
