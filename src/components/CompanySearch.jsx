import React, { useState } from 'react';

function CompanySearch({ searchName, onSearchChange }) {
  const searchHandler = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        id="search"
        placeholder="Search company..."
        value={searchName}
        onChange={onSearchChange}
      />
    </div>
  );
}

export default CompanySearch;
