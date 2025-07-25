require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
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

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "id not formatted properly" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const currentDateTime = () => new Date();

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/info", (request, response) => {
  Person.find({}).then((result) => {
    response.send(`
      <div>Phonebook has info for ${result.length} people</div>
      <p>${currentDateTime()}</p>
      `);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((result) => response.json(result));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      if (!updatedPerson) return response.status(404).end();
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: "bad request" });
};

// Handler of requests with unknown endpoint
app.use(unknownEndpoint);
// Handler of requests with result to error
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
