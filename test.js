const fetch = require("node-fetch");

// Testing users/getall
fetch('http://localhost:3005/users/getall', {
    method: "get",
    headers: {"Content-Type": "application/json"},
})
    .then(res => res.json())
    .then(json  => {
        if (json[0].username == "admin") console.log("Users: getall = PASSED");
        else console.log("Users: getall = FAILED");
    });

// Testing users/login with valid user
fetch('http://localhost:3005/users/login', {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username: "admin" })
})
    .then(res => res.json())
    .then(json  => {
        if (json.username == "admin") console.log("Users: login with valid user = PASSED");
        else console.log("Users: login with valid user = FAILED");
    });

// Testing users/login with invalid user
fetch('http://localhost:3005/users/login', {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username: "empty" })
})
    .then(res => res.json())
    .then(json  => {
        if (json.error) console.log("Users: login with invalid user = PASSED");
        else console.log("Users: login with invalid user = FAILED");
    });

// Testing items/getall
fetch('http://localhost:3005/items/getall', {
    method: "get",
    headers: {"Content-Type": "application/json"},
})
    .then(res => res.json())
    .then(json  => {
        if (json[0].itemName == "Ajax") console.log("Items: getall = PASSED");
        else console.log("Items: getall = FAILED");
    });

// Testing items/searchItem with valid item
fetch('http://localhost:3005/items/searchItem', {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ itemId: "0" })
})
    .then(res => res.json())
    .then(json  => {
        if (json.itemName == "Ajax") console.log("Items: seaching valid item = PASSED");
        else console.log("Items: seaching valid item = FAILED");
    });

// Testing items/login with invalid item
fetch('http://localhost:3005/items/searchItem', {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ itemId: "empty" })
})
    .then(res => res.json())
    .then(json  => {
        if (json.error) console.log("Items: seaching invalid item = PASSED");
        else console.log("Items: seaching invalid item = FAILED");
    });

// Testing /transactions/newPurchase
fetch('http://localhost:3005/transactions/newPurchase', {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(
    {
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
            currentAmount: 1000,
            soldAmount: 60,
            price: 40.00,
            boughtAmount: 10,
          },
          {
            itemId: "1",
            itemName: "Arsenal",
            currentAmount: "1000",
            soldAmount: "9",
            price: "34.98",
            boughtAmount: "5",
          },
        ],
      }
    )
})
    .then(res => res.json())
    .then(json  => {
        if (json) console.log("Transaction: new purchase = PASSED");
        else console.log("Transaction: new purchase = FAILED");
    });