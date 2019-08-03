import React, { useEffect, useContext, useState } from "react";
import FirebaseContext from '../../firebase/context';
import JobItem from './JobItem';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

const JobDetail = props => {
  const { firebase, user } = useContext(FirebaseContext);
  const [job, setJob] = useState(null);
  console.log(props)

  const jobId = props.match.params.jobId;
  const jobRef = firebase.db.collection('job').doc(jobId);
  console.log(jobId)

  useEffect(() => {
    getJob()
  }, [])

  function getJob() {
    jobRef.get().then(doc => {
      setJob({
        ...doc.data(),
        id: doc.id
      })
    })
  }

  console.log(job)

  return !job ? (
    <div>Loading...</div>
  ) : (
    <div>
      {/* <JobItem 
        showCount={false}
        job={job}
      /> */}
      <span>
        <h1>Company Name: {job.companyName}</h1>
        <h1>Order Reference: {job.orderId}</h1>  
      </span>
      
      <h2>Job Type: {job.job}</h2>
      <p>{job.description}</p>
    </div>
  )
}

export default JobDetail;