const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/fruitsDB";

mongoose.set("strictQuery", false);

mongoose.connect(url, { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified."],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//   rating: 10,
//   review: "Pretty solid as a fruit.",
// });

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "Decent fruit.",
});

mango.save();

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favoriteFruit: pineapple,
// });

// person.save();

Person.updateOne({name: "Amy"}, {favoriteFruit: mango}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('updated successfully')
  }
})

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!",
// });

// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour for me",
// });

// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird texture",
// });

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne(
//   { _id: "63ed3d30f33637329f644747" },
//   { name: "Peach" },
//   function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully updated the document.");
//       mongoose.connection.close(function () {
//         console.log("mongoose default connection closed");
//         process.exit();
//       });
//     }
//   }
// );

// Fruit.deleteOne({ _id: "63ed3d30f33637329f644747" }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Deleted successfully!");
//   }
// });

// Person.deleteMany({ name: "John" }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("deleted everything!");
//   }
// });
