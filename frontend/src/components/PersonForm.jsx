const PersonForm = ({filterValue, handleFilterChange }) => {
  return (
    <div>
      {" "}
      <form>
        <div>
          filter shown with:{" "}
          <input value={filterValue} onChange={handleFilterChange} />
          {/* {console.log(filterValue)} */}
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
