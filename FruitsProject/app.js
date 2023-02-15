const { MongoClient } = require("mongodb");
// const assert = require("assert");

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";

const dbName = "dbFruits";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    await client.db(dbName).command({ ping: 1 });
    console.log("connected successfully to server");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const myDB = client.db(dbName);
const myColl = myDB.collection("fruits");

async function insertMany() {
  try {
    const docs = [
      { _id: 1, fruit: "Apple", score: 8, review: "Great fruit" },
      { _id: 2, fruit: "Orange", score: 6, review: "Kinda sour" },
      { _id: 3, fruit: "Banana", score: 9, review: "Great stuff!" },
    ];
    const insertManyResult = await myColl.insertMany(docs);
    let ids = insertManyResult.insertedIds;

    console.log(`${insertManyResult.insertedCount} documents were inserted.`);
    for (let id of Object.values(ids)) {
      console.log(`Inserted a document with id ${id}`);
    }
  } catch (e) {
    console.log(
      `A MongoBulkWriteException occurred, but there are successfully processed documents.`
    );
    let ids = e.result.result.insertedIds;
    for (let id of Object.values(ids)) {
      console.log(`Processed a document with id ${id._id}`);
    }
    console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
  }
}
insertMany();
