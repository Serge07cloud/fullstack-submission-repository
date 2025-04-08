import { useState } from "react";
import axios from "axios";

const Persons = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  );
};

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  nameValue,
  onChangeName,
  phoneValue,
  onChangePhone,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={phoneValue} onChange={onChangePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [query, setQuery] = useState("");

  const matchingResponse = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();

    if (alreadyExist()) alert(`${newName} is already added to phone book.`);
    else {
      const newPerson = { name: newName, number: newPhone };
      const baseUrl = `http://localhost:3001/persons`;
      // save contact on the server
      axios.post(baseUrl, newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewPhone("");
      });
    }
  };

  const alreadyExist = () =>
    persons.some(
      (person) => person.name.toLowerCase() == newName.toLowerCase()
    );

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onChange={handleQuery} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onChangeName={handleNewName}
        phoneValue={newPhone}
        onChangePhone={handleNewPhone}
      />
      <h3>Numbers</h3>
      {matchingResponse.map((person) => (
        <Persons key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
