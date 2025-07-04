const express = require("express");
const app = express();
const morgan = require('morgan');

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(morgan('tiny'));

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));



let persons = [
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
  {
    id: "5",
    name: "John Doe",
    number: "358-40-123456",
  },
];

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}`);
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
    console.log(req);
    console.log(person);
  } else {
    res.status(404).json({ error: "person not found" });
  }
});
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);
  if (!person) {
    res.status(404).json({ error: "person not found" });
  }
  persons = persons.filter((p) => p.id !== id);
  res.status(200).json({ message: "Person deleted successfully" });
});
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "name or number missing" });
  }
  const doesPersonExist = persons.find((p) => p.name === name);
  if (doesPersonExist) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const newPerson = {
    id: Math.floor(Math.random() * 1_000_000_000), // generate random id
    name,
    number,
  };
  persons.push(newPerson);
  return res.status(201).json(newPerson);
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import http from 'http'

// const http = require('http')

// const app = http.createServer((request, response) =>{
//     response.writeHead(200,{'Content-Type': 'text/plain'}),
//     response.end('hello world\n')
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`server running on port ${PORT}`)

// const http = require('http')

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
