import React from 'react';
import {Comment} from '../../types/comment';
import ReviewComment from '../review-comment/review-comment';
import {useAppSelector} from '../../hooks';

type ReviewsProps = {
  comments: Comment[];
}

function Reviews({comments}: ReviewsProps): JSX.Element {

  const isReviewsLoaded = useAppSelector(({REVIEWS}) => REVIEWS.isReviewsLoaded);

  return (
    <ul className="reviews__list" style={isReviewsLoaded ? {opacity: '1'} : {opacity: '0.5'}}>
      {comments.map((comment) =>
        (
          <ReviewComment key={comment.id} comment={comment}/>
        ),
      )}
    </ul>
  );
}

export default React.memo(Reviews);
