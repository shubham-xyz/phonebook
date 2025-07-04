// External imports
import { useState, useEffect } from "react";
// import axios from "axios";

// Internal imports
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import bookService from "./services/person";

const App = () => {
  // States
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterName, setFilterName] = useState("");
  
    // Effects
    useEffect(() => {
      bookService
      .getAll()
      .then((response) => {
        setPersons(response);
        console.log(response)
      })
    }, []);
  
  // Handlers
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterName(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();
    if (!trimmedName || !trimmedNumber) {
      alert("Please enter a valid name and number!");
      return;
    }
    const existingPerson = persons.find((person) => person.name === trimmedName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${trimmedName} is already added to the phonebook, replace the old number with a new one?`
      );
  
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, phone: trimmedNumber };
  
        bookService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert(
              `The contact '${existingPerson.name}' was already removed from the server`
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else {
      const newPerson = {
        name: trimmedName,
        phone: trimmedNumber,
      };
  
      bookService.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);

    console.log(person.id)
    const confirmation = window.confirm(`Are you sure you want to delete ${person.name}?`);

    if(confirmation){
      bookService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setFilterName(newFilterName.filter((person)=>person.id !== id))

      })

    }
  }
  // Derived data
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilterName.toLowerCase())
  
    // person.name.includes(newFilterName)
  );
  

  // Render
  return (
    <div>
      <h2>Phonebook</h2>

      <PersonForm
        filterValue={newFilterName}
        handleFilterChange={handleFilterChange}
      />

      <h2>Add number</h2>
      <Filter
        addNumber={addPerson}
        newName={newName}
        handleAddNumber={handleNameChange}
        newNumber={newNumber}
        handleAddANumber={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;













// import { useState, useEffect } from "react";
// import axios from "axios";

// import Filter from "./components/filter";
// import Persons from "./components/Persons";
// import PersonForm from "./components/PersonForm";
// import bookService from "./services/person";

// const App = () => {
//   const [persons, setPersons] = useState([]);
//   const [newName, setNewName] = useState("add a name...");
//   const [newNumber, setNewNumber] = useState("add a number...");
//   const [newFilterName, setFilterName] = useState("");

//   const handlesearchedArray = (e) => {
//     setFilterName(e.target.value);
//     console.log(e.target.value);

//     setPersons(filteredUsers);
//   };

//   const handleAddNumber = (e) => {
//     setNewName(e.target.value);
//     console.log(e.target.value);
//   };
//   const handleAddANumber = (e) => {
//     setNewNumber(e.target.value);
//     console.log(e.target.value);
//   };
  
//   const addNumber = (e) => {
//     e.preventDefault();
    
//     if (persons.some((person) => person.name === newName)) {
//       alert(`${newName} is already added to the phonebook`);
//     }
    
//     const personObject = {
//       name: newName,
//       id: persons.length + 1,
//       number: newNumber,
//     };
//     setPersons(persons.concat(personObject));
//     setNewName("");
//     setNewNumber("");
//   };
  
//   const filteredUsers = persons.filter((person) =>
//     person.name.toLowerCase().includes(newFilterName.toLowerCase())
//   );

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/contacts")
//       .then((response) => {
//         setPersons(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching contacts:", error);
//       });
//   }, []);




//   return (
//     <div>
//       <h2>Phonebook</h2>

//       <h2>Search number </h2>
//       <PersonForm
//         filterValue={newFilterName}
//         handleFilterChange={handlesearchedArray}
//       />

//       <h2>Add number </h2>
//       <Filter
//         addNumber={addNumber}
//         newName={newName}
//         handleAddNumber={handleAddNumber}
//         newNumber={newNumber}
//         handleAddANumber={handleAddANumber}
//       />

//       <h2>Numbers</h2>
//       <Persons persons={persons} />
//     </div>
//   );
// };

// export default App;
