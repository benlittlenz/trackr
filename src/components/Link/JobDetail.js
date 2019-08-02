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
      <JobItem 
        showCount={false}
        job={job}
      />
      <h1>{job.companyName}</h1>
    </div>
  )
}

export default JobDetail;