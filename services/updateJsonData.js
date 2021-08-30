function updateUserJSONPasswordData(userJSON1, userJSON2) {
    userJSON1.password = userJSON2.password;
    return userJSON1;
  }
  
  function updateItemJSONData(itemJSON1, itemJSON2) {
    itemJSON1.itemName = itemJSON2.itemName;
    itemJSON1.currentAmount = itemJSON2.currentAmount;
    itemJSON1.soldAmount = itemJSON2.soldAmount;
    itemJSON1.price = itemJSON2.price;
  }
  
  function setEmptyTransactionsArray(userJSON) {
    userJSON.transactions = JSON.stringify([]);
    return userJSON;
  }
  
  module.exports.updateUserJSONPasswordData = updateUserJSONPasswordData;
  module.exports.updateItemJSONData = updateItemJSONData;
  module.exports.setEmptyTransactionsArray = setEmptyTransactionsArray;
  