import { useState } from "react";

const Person = ({ name, phone }) => {
  return (
    <div>
      {name} {phone}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (alreadyExist()) alert(`${newName} is already added to phonebook.`);
    else {
      const newPerson = { name: newName, phone: newPhone };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewPhone("");
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handleNewPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.name} name={person.name} phone={person.phone} />
      ))}
    </div>
  );
};

export default App;
