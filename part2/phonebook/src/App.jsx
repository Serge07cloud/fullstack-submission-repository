import { useState, useEffect } from "react";
import contactService from "./services/contact";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () =>
{
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [query, setQuery] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("error");

  useEffect(() =>
  {
    contactService.getAll().then((contacts) => setPersons(contacts));
  }, []);

  const matchingResponse = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );

  const displayFlashMessage = (message, type) =>
  {
    setAlertType(type);
    setAlertMessage(message);
    setTimeout(() =>
    {
      setAlertMessage(null);
    }, 5000);
  };

  const addPerson = (event) =>
  {
    event.preventDefault();
    const newPerson = { name: newName, number: newPhone };
    if (alreadyExist())
    {
      // ask the user if the number should be updated
      const response = confirm(
        `${newPerson.name} is already added to the phone book, replace the number with the new one ?`
      );
      if (response)
      {
        const person = persons.find((person) => person.name === newPerson.name);
        if (typeof person !== "undefined")
        {
          contactService
            .update(person.id, newPerson)
            .then((response) =>
            {
              setPersons(
                persons.map((person) =>
                  person.id === response.id ? response : person
                )
              );
              displayFlashMessage(
                `${response.name}'s contact updated`,
                "success"
              );
              setNewName("");
              setNewPhone("");
            })
            .catch((error) =>
            {
              displayFlashMessage(error.response.data.error, "error");
              setPersons(
                persons.filter(
                  (person) =>
                    person.name.toLowerCase() !== newPerson.name.toLowerCase()
                )
              );
            });
        } else
        {
          displayFlashMessage(
            `Information of '${newPerson.name}' has already been removed from server.`,
            "error"
          );
          setPersons(
            persons.filter(
              (person) =>
                person.name.toLowerCase() !== newPerson.name.toLowerCase()
            )
          );
        }
      }
    } else
    {
      // save contact on the server
      contactService.create(newPerson).then((createdPerson) =>
      {
        setPersons(persons.concat(createdPerson));
        displayFlashMessage(`Added ${createdPerson.name}`, "success");
        setNewName("");
        setNewPhone("");
      }).catch((error) =>
      {
        console.log(error);
        displayFlashMessage(error.response.data.error, "error");
      })
    }
  };

  const deletePerson = (id) =>
  {
    contactService.remove(id).then(() =>
    {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const alreadyExist = () =>
    persons.some(
      (person) => person.name.toLowerCase() == newName.toLowerCase()
    );

  const handleNewName = (event) =>
  {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) =>
  {
    setNewPhone(event.target.value);
  };

  const handleQuery = (event) =>
  {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={ alertMessage } type={ alertType } />
      <Filter value={ query } onChange={ handleQuery } />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={ addPerson }
        nameValue={ newName }
        onChangeName={ handleNewName }
        phoneValue={ newPhone }
        onChangePhone={ handleNewPhone }
      />
      <h3>Numbers</h3>
      { matchingResponse.map((person) => (
        <Persons
          key={ person.name }
          name={ person.name }
          handleDelete={ () => deletePerson(person.id) }
          number={ person.number }
        />
      )) }
    </div>
  );
};

export default App;
