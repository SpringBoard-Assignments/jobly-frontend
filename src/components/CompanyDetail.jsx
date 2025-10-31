import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      const res = await JoblyApi.getCompany(handle);
      setCompany(res);
    }
    getCompany();
  }, [handle]);

  if (!company) return <p>Loading....</p>;
  return (
    <div className="CompanyDetaul">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <h4>Jobs:</h4>
      <ul>
        {company.jobs.map((j) => (
          <li key={j.id}>
            {j.title} - {j.salary ? `$${j.salary}` : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyDetail;
