const express = require("express");
const app = express();
const PORT = 3001;
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const response = `
    <p> 
        PhoneBook has info for ${persons.length} people
    </p>
    <br/>
    <p>
        ${new Date()}
    </p>
    `;
  res.send(response);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const data = persons.find((d) => d.id === id);
  data ? res.json(data) : res.status(400).send("no existe la data");
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(200).send(persons);
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name) return res.status(400).json({ error: "name is required" });

  if (!number) return res.status(400).json({ error: "number is required" });

  if (persons.some((n) => n.name === name))
    return res.status(400).json({ error: "name must be unique" });

  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;

  const newPerson = {
    id: maxId + 1,
    name,
    number,
  };

  persons = persons.concat(newPerson);
  res.status(201).json(newPerson);
});

app.listen(PORT, () => console.log("app is listening on port", PORT));
