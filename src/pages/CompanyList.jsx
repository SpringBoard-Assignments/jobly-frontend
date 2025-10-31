import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import CompanyCard from '../components/CompanyCard';
import { Link } from 'react-router-dom';
import CompanySearch from '../components/CompanySearch';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function search(name) {
    const res = await JoblyApi.getCompanyList(name);
    setCompanies(res);
  }
  // just for initial render, no name so entire list is fetched
  useEffect(() => {
    async function getDefaultCompanies() {
      await search();
      setIsLoading(false);
    }
    getDefaultCompanies();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="CompanyList">
      <CompanySearch onSearchChange={search} />
      {companies.length ? (
        companies.map((i) => (
          <Link key={i.handle} to={`/companies/${i.handle}`}>
            <CompanyCard
              name={i.name}
              description={i.description}
              logoUrl={i.logoUrl}
            />
          </Link>
        ))
      ) : (
        <p>No results found...</p>
      )}
    </div>
  );
}

export default CompanyList;
