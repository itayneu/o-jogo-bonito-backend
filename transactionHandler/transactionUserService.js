function editTransactionsData(transactionArr, transaction) {
    delete transaction.username;
    transactionArr.push(transaction);
    return transactionArr;
  }
  
  module.exports.editTransactionsData = editTransactionsData;
  