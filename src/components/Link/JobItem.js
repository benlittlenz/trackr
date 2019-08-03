import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import FirebaseContext from '../../firebase/context';
import { Label, Button, List, Divider } from 'semantic-ui-react'

import differenceInHours from 'date-fns/difference_in_hours'

const JobItem = ({ job, index, showCount, history }) => {
    const { firebase, user } = useContext(FirebaseContext);
    console.log(job)

    function handleDeleteJob() {
        const jobRef = firebase.db.collection('job').doc(job.id);
        jobRef.delete().then(() => {
            console.log(`deleted job with id of ${job.id}`)
        }).catch(err => {
            console.error(err)
        })
    }

    // function getDomain(url) {
    //     return url.replace(/^https?:\/\//i, "");
    // }
    
    const postedByAuthUser = user && user.uid === job.createdBy.id

    let todaysDate = new Date().setDate(new Date().getDate())
    let yesterdayDate = new Date().setDate(new Date().getDate() - 1);

    console.log(todaysDate, yesterdayDate)
    return (
        <div className="flex items-start mt2">
            <div className="flex items-center">
                { showCount && (
                    <span className="gray">{index}.</span>
                )}
                {differenceInHours(job.created, new Date()) >= -6 && (
                    <Label as='a' color='red' tag>
                        New Job
                    </Label>   
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
                    
                    <Link to={`/job/${job.id}`}>
                        <Button 
                            style={{
                                position: "relative",
                                float: "right",
                                bottom: '30px'
                            }}
                            positive>
                            View Job
                        </Button>  
                    </Link>
                    {postedByAuthUser && (
                        <>
                        <Button 
                            style={{
                                position: "relative",
                                float: "right",
                                bottom: '30px'
                            }}
                            negative
                            onClick={handleDeleteJob}
                        >Delete Job</Button>
                            {/* { " | "}
                            <span 
                                className="delete-button"
                                onClick={handleDeleteJob}
                                >Delete</span> */}
                        </>
                    )}
                </div>
                <Divider />
            </div>
        </div>
    )

}

export default withRouter(JobItem);