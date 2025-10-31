import React from 'react';

function CompanyCard({ name, description, logoUrl }) {
  return (
    <div className="CompanyCard">
      <h3>{name}</h3>
      <p>{description}</p>
      {logoUrl && <img src={logoUrl} alt={`${name} logo`} />}
    </div>
  );
}

export default CompanyCard;
