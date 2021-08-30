const request = require("supertest");
const app = require("./app");

describe("Get /users/getall", function () {
  it("responds with json containing a list of all users", function (done) {
    request(app)
      .get("/users/getall")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /users/login", function () {
  let data = { username: "admin" };
  it("respond with json containing a single user", function (done) {
    request(app)
      .post("/users/login")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /users/login", function () {
  let data = { username: "notExists" };
  it("respond with json user not found", function (done) {
    request(app)
      .post("/users/login")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(200, done);
  });
});

describe("Get /items/getall", function () {
  it("responds with json containing a list of all items", function (done) {
    request(app)
      .get("/users/getall")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /items/searchItem", function () {
  let data = { itemId: "0" };
  it("respond with json containing a single item", function (done) {
    request(app)
      .post("/items/searchItem")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /items/searchItem", function () {
  let data = { itemId: "999" };
  it("respond with json item not found", function (done) {
    request(app)
      .post("/items/searchItem")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(200, done);
  });
});

describe("POST /transactions/newPurchase", function () {
  let data = {
    date: "08:08 08/08/2021",
    username: "admin",
    paymentData: {
      cardHolder: "admin admin",
      cardNumber: "111111111111",
      expiration: "0921",
      cvv: "100",
    },
    purchases: [
      {
        itemId: "0",
        itemName: "Ajax",
        currentAmount: "1000",
        soldAmount: "60",
        price: "42.00",
        boughtAmount: "10",
      },
      {
        itemId: "1",
        itemName: "Arsenal",
        currentAmount: "1000",
        soldAmount: "8",
        price: "34.98",
        boughtAmount: "5",
      },
    ],
  };
  it("respond with answer for transactions", function (done) {
    request(app)
      .post("/transactions/newPurchase")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(200, done);
  });
});
