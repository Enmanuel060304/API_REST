const mongoose = require("mongoose");

const password = process.argv[2];
const mongoUrl = `mongodb+srv://vattistue:${password}@cluster0.428uxbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl);

const personSchema = new mongoose.Schema({
  nombre: String,
  numero: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 3 && process.argv.length < 5) {
  console.log(
    "Please provide more arguments: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
} else if (process.argv.length === 3) {
  console.log("Phonebook:");
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(`${person.nombre} ${person.numero}`);
      });
      mongoose.connection.close();
    });
} else {
  const person = new Person({
    nombre: process.argv[3],
    numero: process.argv[4],
  });

  person.save().then(() => {
    console.log(`added ${person.nombre} number ${person.numero} to phonebook`);
    mongoose.connection.close();
  });
}
