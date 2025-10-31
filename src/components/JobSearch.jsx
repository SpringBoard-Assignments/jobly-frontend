import React, { useState } from 'react';

function JobSearch({ searchName, onSearchChange }) {
  const searchHandler = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        id="search"
        placeholder="Search job..."
        value={searchName}
        onChange={searchHandler}
      />
    </div>
  );
}

export default JobSearch;
