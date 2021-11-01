const express = require("express");
const RateLimit = require("express-rate-limit");
const helmet = require("helmet");
const Ddos = require("ddos");
const ddos = new Ddos({ burst: 10, limit: 150 });
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const users = require("./routing/users");
const items = require("./routing/items");
const transactions = require("./routing/transactions");

const port = 3005;
const app = express();

app.use(helmet());
//app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS)
app.use(ddos.express);
let apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  delayMs: 0, // disabled
  message:
    "Too many accounts created from this IP, please try again after an 15 minuts",
});
app.use("/api/", apiLimiter);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/isAlive", function (req, res, next) {
  res.send("<h1>Service Is Up</h1>");
});

app.use("/static", express.static("public"));
app.use("/items", items);
app.use("/transactions", transactions);
app.use("/users", users);

app.listen(port, function () {
  console.log(`Listening on port: ${port}`);
});

module.exports = app.listen(3006);
