import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from '../../firebase/context';
import JobItem from './JobItem';

const JobList = ({ location }) => {
  const { firebase } = useContext(FirebaseContext);
  const [jobs, setJobs] = useState([]);
  const isNewPage = location.pathname.includes('new');

  useEffect(() => {
    getJobs()
  }, [])

  function getJobs() {
    firebase.db
      .collection('job')
      .orderBy('created', 'desc')
      .onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    const jobs = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setJobs(jobs);
  }

  function renderJobs() {
    if(isNewPage) {
      return jobs
    }
  }

  return (
    <div>
      {jobs.map((job, index) => (
        <JobItem key={job.id} showCount={true} job={job} index={index + 1} />
      ))}
    </div>
  )
}

export default JobList;