const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Give password as third argument");
  process.exit(1);
}

const [password, name, number] = [
  process.argv[2],
  process.argv[3],
  process.argv[4],
];

const url = `mongodb+srv://fullstack:${password}@dev-cluster.x7ygwaq.mongodb.net/?retryWrites=true&w=majority&appName=dev-cluster`;

// Do not use strict query
mongoose.set("strictQuery", false);

// Establishing connection to database
mongoose.connect(url);

// Defining a new schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Defining the model
const Person = mongoose.model("Person", personSchema);

// Create a new Person instance
const person = new Person({
  name,
  number,
});

if (process.argv.length === 3) {
  // Display all the entries in the phonebook
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  //Save the new entry into the database
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
