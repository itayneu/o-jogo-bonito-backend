const {
    updateItemData,
    updateUserJSONTransactionData,
  } = require("../dataHandler/dataUpdater");
  const { searchItem } = require("../dataHandler/dataSearcher");
  const { updateAmountBoughtFromItem } = require("./transactionItemService");
  
  //The function handles transaction processing
  async function transactionProcessor(transaction) {
    let answer = await updateUserJSONTransactionData(transaction);
    answer = transaction.purchases.map(async (itemObj) => {
      const itemJSON = await searchItem(itemObj);
      await updateItemData(
        updateAmountBoughtFromItem(itemJSON, itemObj.boughtAmount)
      );
    });
    return answer;
  }
  
  module.exports.transactionProcessor = transactionProcessor;
  