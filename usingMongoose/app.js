const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/peopleDB";

mongoose.set("strictQuery", false);

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = mongoose.model("person", personSchema);

const person = new Person({
  name: "John",
  rating: 31,
});

person.save();
