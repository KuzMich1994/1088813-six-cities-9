import React from 'react';
import {Comment} from '../../types/comment';
import ReviewComment from '../review-comment/review-comment';

type ReviewsProps = {
  comments: Comment[];
}

function Reviews({comments}: ReviewsProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {comments.map((comment) =>
        (
          <ReviewComment key={comment.id} comment={comment}/>
        ),
      )}
    </ul>
  );
}

export default Reviews;
