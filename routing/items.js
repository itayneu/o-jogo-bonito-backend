const express = require("express");
const router = express.Router();
const Ddos = require("ddos");
const ddos = new Ddos({ burst: 10, limit: 150 });
const { createItem } = require("../dataHandler/dataCreator");
const { searchItem, searchAllItems } = require("../dataHandler/dataSearcher");
const { updateItemData } = require("../dataHandler/dataUpdater");
const cors = require("cors");

//protect against ddos attack
router.use(ddos.express);

router.get("/getall", cors(), async function (req, res, next) {
  const data = await searchAllItems();
  res.send(data);
});

router.post("/add", cors(), async function (req, res, next) {
  const data = await createItem(req.body);
  res.send(data);
});

router.post("/searchItem", cors(), async function (req, res, next) {
  const data = await searchItem(req.body);
  res.send(data);
});

router.put("/update", async function (req, res, next) {
  const data = await updateItemData(req.body);
  res.send(data);
});

module.exports = router;
