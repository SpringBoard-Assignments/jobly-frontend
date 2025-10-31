import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import JobCard from '../components/JobCard';
import JobSearch from '../components/JobSearch';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function search(title) {
    const res = await JoblyApi.getJobList(title);
    setJobs(res);
  }

  useEffect(() => {
    async function getDefaultJobs() {
      await search();
      setIsLoading(false);
    }
    getDefaultJobs();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="JobList">
      <JobSearch onSearchChange={search} />
      {jobs.length ? (
        jobs.map((i) => (
          <JobCard
            key={i.id}
            id={i.id}
            title={i.title}
            salary={i.salary}
            equity={i.equity}
            companyHandle={i.companyHandle}
          />
        ))
      ) : (
        <p>No jobs found...</p>
      )}
    </div>
  );
}

export default JobList;
