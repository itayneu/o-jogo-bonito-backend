const express = require("express");
const router = express.Router();
const Ddos = require("ddos");
const ddos = new Ddos({ burst: 10, limit: 150 });
const { createUser } = require("../dataHandler/dataCreator");
const { searchUser, searchAllUsers } = require("../dataHandler/dataSearcher");
const { setEmptyTransactionsArray, updateUserJSONPasswordData } = require("../services/updateJsonData");
const cors = require("cors");

//protect against ddos attack
router.use(ddos.express);

router.get("/getall", cors(), async function (req, res, next) {
  const data = await searchAllUsers();
  res.send(data);
});

router.post("/signup/add", cors(), async function (req, res, next) {
  const data = await createUser(setEmptyTransactionsArray(req.body));
  res.send(data);
});

router.post("/login", cors(), async function (req, res, next) {
  const data = await searchUser(req.body);
  res.send(data);
});

router.put("/update", cors(), async function (req, res, next) {
  const userDBData = await searchUser(req.body);
  const newUserData = updateUserJSONPasswordData(userDBData, req.body);
  const data = await createUser(newUserData);
  res.send(data);
});

module.exports = router;
