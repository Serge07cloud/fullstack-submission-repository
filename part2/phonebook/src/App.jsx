import { useState, useEffect } from "react";
import contactService from "./services/contact";

const Persons = ({ name, number, handleDelete }) => {
  return (
    <div>
      {name} {number}
      <button type="button" onClick={handleDelete}>
        {" "}
        delete
      </button>
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    contactService.getAll().then((contacts) => setPersons(contacts));
  }, []);

  const matchingResponse = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();

    if (alreadyExist()) alert(`${newName} is already added to phone book.`);
    else {
      const newPerson = { name: newName, number: newPhone };
      // save contact on the server
      contactService.create(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewPhone("");
      });
    }
  };

  const deletePerson = (id) => {
    contactService.remove(id).then((response) => {
      setPersons(persons.filter((person) => person.id !== response.id));
    });
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
        <Persons
          key={person.name}
          name={person.name}
          handleDelete={() => deletePerson(person.id)}
          number={person.number}
        />
      ))}
    </div>
  );
};

export default App;
