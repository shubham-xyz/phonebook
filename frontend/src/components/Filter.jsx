const Filter = ({
  addNumber,
  newName,
  handleAddNumber,
  newNumber,
  handleAddANumber,
}) => {
  return (
    <div>
      {" "}
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleAddNumber} placeholder="Add a name..."
 />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleAddANumber} placeholder="Add a number..."
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
