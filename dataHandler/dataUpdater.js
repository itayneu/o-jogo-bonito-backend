const { createUser, createItem } = require("./dataCreator");
const { searchUser, searchItem } = require("./dataSearcher");
const { editTransactionsData } = require("../transactionHandler/transactionUserService");

/**
 * The function gets user username and updates his data
 * @param {user json} userJSON
 */
async function updateUserData(userJSON) {
  const data = await createUser(userJSON);
  return data;
}

/**
 * The function updated item data by itemjson
 * @param {itemJSON} itemJSON
 */
async function updateItemData(itemJSON) {
  const data = await createItem(itemJSON);
  return data;
}

/**
 * The function updates password for userjson by new one
 * that it recieved
 * @param {*} userJSON1
 * @param {*} userJSON2
 */
async function updateUserJSONPasswordData(userJSON1, userJSON2) {
  userJSON1.password = userJSON2.password;
  await updateUserData(userJSON1);
}

/**
 * The function updates transaction data in db
 * @param {*} transaction
 */
async function updateUserJSONTransactionData(transaction) {
  let userJSON = await searchUser(transaction);
  let transactionsArray = JSON.parse(userJSON.transactions);
  transactionsArray = editTransactionsData(transactionsArray, transaction);
  userJSON.transactions = JSON.stringify(transactionsArray);
  updateUserData(userJSON);
}

module.exports.updateItemData = updateItemData;
module.exports.updateUserJSONPasswordData = updateUserJSONPasswordData;
module.exports.updateUserJSONTransactionData = updateUserJSONTransactionData;
