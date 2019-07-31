import React, { useEffect, useContext, useState } from "react";
import FirebaseContext from '../../firebase/context';
import JobItem from './JobItem';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

const LinkDetail = props => {
  const { firebase, user } = useContext(FirebaseContext);
  const [link, setLink] = useState(null);
  const [commentText, setCommentText] = useState('');

  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection('links').doc(linkId);

  useEffect(() => {
    getLink()
  }, [])

  function getLink() {
    linkRef.get().then(doc => {
      setLink({
        ...doc.data(),
        id: doc.id
      })
    })
  }

  function handleAddComment() {
    if(!user) {
      props.history.push('/')
    } else {
      linkRef.get().then(doc => {
        if(doc.exists) {
          const previousComments = doc.data().comments
          const comment = {
            postedBy: {
              id: user.uid,
              name: user.displayName
            },
            created: Date.now(),
            text: commentText
        }
        const updatedComments = [...previousComments, comment]
        linkRef.update({ comments : updatedComments })
        setLink(prevState => ({
          ...prevState,
          comments: updatedComments
        }))
        setCommentText('')
      }
      })
    }
  }
  console.log(link)

  return !link ? (
    <div>Loading...</div>
  ) : (
    <div>
      <JobItem 
        showCount={false}
        link={link}

      />
      <textarea
        onChange={event => setCommentText(event.target.value)}
        
        value={commentText}
        rows="6"
        cols="60"
      />
      <div>
        <button className="button"
          onClick={handleAddComment}  
        >Add Comment</button>
      </div>
      {link.comments.map((comment, index) => (
        <div key={index}>
        <p className="comment-author">
          {comment.postedBy.name} {distanceInWordsToNow(comment.created)}
        </p>
        <p>{comment.text}</p>
        </div>
      ))}
    </div>
  )
}

export default LinkDetail;