import { useContext, useState } from 'react';
import UserContext from '../authContext';
import JoblyApi from '../api';

function JobCard({ id, title, salary, equity, companyHandle }) {
  const { currUser, setCurrUser } = useContext(UserContext);

  //local state for applied jobs
  const [applied, setApplied] = useState(new Set(currUser.applications || []));

  //apply button hander and application logic
  async function handleApply() {
    if (applied.has(id)) return;

    try {
      await JoblyApi.applyToJob(currUser.username, id);

      //update user states (local and global)
      setApplied(new Set([...applied, id]));
      setCurrUser((i) => ({
        ...i,
        applications: [...i.applications, id],
      }));
    } catch (err) {
      console.error('Application submission failed', err);
    }
  }
  const isApplied = applied.has(id);

  return (
    <div className="JobCard">
      <h3>{title}</h3>
      {companyHandle && <p>Company: {companyHandle}</p>}

      <p>Salary: {salary ? `$${salary.toLocaleString()}` : 'N/A'}</p>

      {equity !== undefined && <p>Equity: {equity}</p>}

      <button onClick={handleApply} disabled={isApplied}>
        {isApplied ? 'Applied' : 'Apply'}
      </button>
    </div>
  );
}

export default JobCard;
