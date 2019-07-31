import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import FirebaseContext from '../../firebase/context';

const JobItem = ({ job, index, showCount, history }) => {
    const { firebase, user } = useContext(FirebaseContext);
    console.log(job)

    function handleDeleteJob() {
        const jobRef = firebase.db.collection('links').doc(job.id);
        jobRef.delete().then(console.log(job.id))
    }

    const postedByAuthUser = user && user.uid === job.createdBy.id

    return (
        <div className="flex items-start mt2">
            <div className="flex items-center">
                { showCount && (
                    <span className="gray">{index}.</span>
                )}
            </div>
            <div className="ml1">
                <div>
                    {job.description} 
                    {/* <span className="link">({getDomain(job.url)})</span> */}
                </div>
                <div className="f6 lh-copy gray">
                    {job.createdBy.name} {distanceInWordsToNow(job.created)}
                    { " | "}
                    {postedByAuthUser && (
                        <>
                            { " | "}
                            <span 
                                className="delete-button"
                                onClick={handleDeleteJob}
                                >Delete</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )

}

export default withRouter(JobItem);