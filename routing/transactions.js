const express = require("express");
const router = express.Router();
const {
  transactionProcessor,
} = require("../transactionHandler/transactionProcessor");

router.post("/newPurchase", async function (req, res, next) {
  const data = await transactionProcessor(req.body);
  res.send(data);
});

module.exports = router;
