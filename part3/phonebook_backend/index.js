const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("content", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

let phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const currentDateTime = () => new Date();
app.get("/api/persons", (request, response) => {
  response.json(phoneBook);
});

const generatedId = () => {
  const max = 2000;
  return Math.floor(Math.random() * max);
};

app.get("/api/info", (request, response) => {
  response.send(`
    <div>Phonebook has info for ${phoneBook.length} people</div>
    <p>${currentDateTime()}</p>
    `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = phoneBook.find((person) => person.id === id);

  if (person) response.json(person);
  else response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phoneBook = phoneBook.filter((item) => item.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    response.status(400).json({
      error: "missing property name",
    });
  }

  // Test whether name is unique
  const exists = phoneBook.some(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  if (exists)
    response.status(400).json({
      error: "name must be unique",
    });

  if (!body.number) {
    response.status(400).json({ error: "missing property number" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generatedId(),
  };

  phoneBook.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
