const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            `number of {person.name} is {person.phone}`
            <button onClick={() => deletePerson(person.id) } >Delete</button>
            {console.log(person.id)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
  