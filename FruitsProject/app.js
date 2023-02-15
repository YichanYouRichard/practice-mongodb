const { MongoClient } = require("mongodb");
// const assert = require("assert");

const uri = "mongodb://localhost:27017";

const dbName = "myproject";

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
const doc = { name: "Neapolitan pizza", shape: "round" };
const result = await myColl.insertOne(doc);
console.log(
   `A document was inserted with the _id: ${result.insertedId}`,
);