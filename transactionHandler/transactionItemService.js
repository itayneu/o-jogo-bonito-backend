/**
 * The function updates item amounts
 * @param {itemJSONobject} itemObject
 * @param {*} amountBought
 */
 function updateAmountBoughtFromItem(itemObject, amountBought) {
    itemObject.currentAmount =
      parseInt(itemObject.currentAmount, 10) - amountBought;
    itemObject.soldAmount =
      parseInt(itemObject.soldAmount, 10) + parseInt(amountBought, 10);
    return itemObject;
  }
  
  module.exports.updateAmountBoughtFromItem = updateAmountBoughtFromItem;
  