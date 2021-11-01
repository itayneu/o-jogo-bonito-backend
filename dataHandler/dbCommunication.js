const fs = require("fs");
let db = {};

if (fs.existsSync('db.json')) {
  console.log('Loading DB');
  const txt = fs.readFileSync('./db.json', 'utf8');
  db = JSON.parse(txt);
} else {
  console.log('DB does not exist');
}

/**
 * The function creates new record in DB
 * @param {Data Record Id} id
 * @param {Corresponding Object to store} dataToStore
 */
async function createInDB(id, dataToStore, callback) {
  return new Promise((resolve, reject) => {
    db[id] = dataToStore;

    const reply = {
      status: 'success',
      id: id,
      dataToStore: dataToStore
    }
    console.log('adding: ' + JSON.stringify(reply));

    const json = JSON.stringify(db, null, 2);
    fs.writeFile('./db.json', json, 'utf8', function (err, obj) {
      if (err) reject(err);
      else resolve(obj);
    });
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
      if(key == id) {
        obj = db[key];
        resolve(obj);
        break;
      }
    }
    if(obj == null) {
      reject("Could not find in DB searchInDB - " + id);
    }
    else {
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
    let keys = Object.keys(db).filter(v => v.startsWith(`${type}`));

    if (keys.length == 0) {
      reject("Could not find in DB");
    } else {
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
  const allData = Promise.all(keysArray.map(returnSearch)).then((dataArray) => {
    return dataArray;
  });
  return allData;
}

module.exports.create = createInDB;
module.exports.search = searchInDB;
module.exports.searchAll = getAllData;