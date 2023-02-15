const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/fruitsDB';

mongoose.connect(url)

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