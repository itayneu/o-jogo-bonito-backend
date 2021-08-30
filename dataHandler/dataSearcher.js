const { encryptString } = require("../services/encryptData");
const { search, searchAll } = require("./dbCommunication");

/**
 * The function searches for user in db by username
 * @param {username} userSearchJsonObject
 */
async function searchUser(userSearchJsonObject) {
  console.log(userSearchJsonObject["username"]);
  const result = await search(
    `user:${encryptString(`${userSearchJsonObject["username"]}`)}`
  )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return { error: error };
    });
  return result;
}

/**
 * The function searches for all users of specific type
 */
async function searchAllUsers() {
  const data = await searchAll(`user`).then((data) => {
    return data;
  });
  return data;
}

/**
 * The function searches for item in db by itemId
 * @param {itemJSON} itemSearhJsonObject
 */
async function searchItem(itemSearhJsonObject) {
  const result = await search(
    `item:${itemSearhJsonObject["itemId"]}`
    )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return { error: error };
    });
  return result;
}

/**
 * The function searches for all items in db
 */
async function searchAllItems() {
  const data = await searchAll(`item`).then((data) => {
    return data;
  });
  return data;
}

module.exports.searchUser = searchUser;
module.exports.searchAllUsers = searchAllUsers;
module.exports.searchItem = searchItem;
module.exports.searchAllItems = searchAllItems;
