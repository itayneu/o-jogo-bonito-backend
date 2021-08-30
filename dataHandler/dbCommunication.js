const fs = require("fs");
let db = {};

// Read DB file
if (fs.existsSync('db.json')) {
  // Read the file
  console.log('loading DB');
  const txt = fs.readFileSync('./db.json', 'utf8');
  // Parse it  back to object
  db = JSON.parse(txt);
} else {
  // Otherwise start with blank list
  console.log('DB does not exist');
}

/**
 * The function creates new record in DB
 * @param {Data Record Id} id
 * @param {Corresponding Object to store} dataToStore
 */
async function createInDB(id, dataToStore, callback) {
  return new Promise((resolve, reject) => {
    // Put it in the object
    //if (db.hasOwnProperty(id)) {
      //reject("Already exists");
    //}
    //else {
      db[id] = dataToStore;

      // Let the request know it's all set
      const reply = {
        status: 'success',
        id: id,
        dataToStore: dataToStore
      }
      console.log('adding: ' + JSON.stringify(reply));

      // Write a file each time we get a new word
      // This is kind of silly but it works
      const json = JSON.stringify(db, null, 2);
      fs.writeFile('./db.json', json, 'utf8', function (err, obj) {
        if (err) reject(err);
        else resolve(obj);
      });
    //}
  });
}

/**
 * The function returns a data record from DB
 * based on input ID. If no such record exists
 * it returns error
 * @param {Record ID} id
 */
async function searchInDB(id) {
  return new Promise((resolve, reject) => {
    let obj;
    for(key in db){
      console.log("searchInDB: key - " + key);
      console.log("searchInDB: id - " + id);
      if(key == id) {
        console.log("searchInDB: Found - " + key);
        obj = db[key];
        console.log("searchInDB: obj - " + obj);
        resolve(obj);
        break;
      }
    }
    if(obj == null) {
      console.log("searchInDB: null");
      reject("Could not find in DB searchInDB - " + id);
    }
    else {
      console.log("searchInDB: yay");
      resolve(res);
    }
    
  });
}

/**
 * The function returns search request with id for promise all
 * @param {*} id
 */
async function returnSearch(id) {
  const result = await searchInDB(id).then((result) => {
    return result;
  });
  return result;
}

/**
 * The function gets all keys from db
 * from specific type
 * @param {type of keys - users or items} type
 */
async function getAllKeys(type) {
  return new Promise((resolve, reject) => {
    console.log("getAllKeys");
    let keys = Object.keys(db).filter(v => v.startsWith(`${type}`));
    console.log("getAllKeys - keys = " + keys);
    //res = Object.keys(db).filter(v => v.startsWith(`${type}`));
    // console.log("");
    // console.log(db);
    // console.log("");
    // console.log(type);
    // console.log("");
    // console.log(db["users"]);
    // console.log("");
    // console.log(keys);
    // console.log("");

    if (keys.length == 0) {
      console.log("getAllKeys: nothing");
      reject("Could not find in DB");
    } else {
      console.log("getAllKeys: something");
      console.log(keys);
      resolve(keys);
    }
  });
}

/**
 * The function returns all data of specific key
 * @param {*} type
 */
async function getAllData(type) {
  const keysArray = await getAllKeys(type).then((result) => {
    return result;
  });
  console.log("keysArray = " + keysArray.map(returnSearch));
  const allData = Promise.all(keysArray.map(returnSearch)).then((dataArray) => {
    console.log("dataArray = " + dataArray);
    return dataArray;
  });
  console.log(allData);
  return allData;
}

module.exports.create = createInDB;
module.exports.search = searchInDB;
module.exports.searchAll = getAllData;
