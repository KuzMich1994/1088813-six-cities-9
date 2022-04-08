import React, {useState} from 'react';
import {Comment} from '../../types/comment';
import ReviewComment from '../review-comment/review-comment';
import {useAppSelector} from '../../hooks';

type ReviewsProps = {
  comments: Comment[];
}

function Reviews({comments}: ReviewsProps): JSX.Element {

  const isReviewsLoaded = useAppSelector(({REVIEWS}) => REVIEWS.isReviewsLoaded);
  const [showMore, setShowMore] = useState(false);

  const reviewsCount = showMore ? comments.length : 10;

  return (
    <>
      <ul className="reviews__list" style={isReviewsLoaded ? {opacity: '1'} : {opacity: '0.5'}}>
        {comments.slice(0, reviewsCount).map((comment) =>
          (
            <ReviewComment key={comment.id} comment={comment}/>
          ),
        )}
      </ul>
      {
        comments.slice(0, reviewsCount).length >= 10 && reviewsCount >= 10 ?
          <button
            style={{background: 'transparent', border: 'none', color: '#4481c3', cursor: 'pointer', paddingBottom: '20px'}}
            onClick={() => setShowMore(true)}
          >
            Show more
          </button> :
          null
      }
    </>
  );
}

export default React.memo(Reviews);
