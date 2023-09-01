import React from "react";
import "./TodoSearch.css";

function TodoSearch({ searchValue, setSearchValue, isSearchDisabled }) {
  const onSearchValueChange = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
    console.log(searchValue);
  };

  return (
    <input
      className="TodoSearch"
      placeholder="Search task"
      type="text"
      value={searchValue}
      onChange={onSearchValueChange}
      disabled={isSearchDisabled}
    />
  );
}

export { TodoSearch };
