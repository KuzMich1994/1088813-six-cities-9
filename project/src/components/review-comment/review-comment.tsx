import {getRating} from '../../utils/common';
import dayjs from 'dayjs';
import {Comment} from '../../types/comment';

type CommentProps = {
  comment: Comment;
}

function ReviewComment({comment}: CommentProps): JSX.Element {

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          {comment.user.avatarUrl ? <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt={comment.user.name} /> : null}
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRating(comment.rating)}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={dayjs(comment.date).format('YYYY-MM-DD')}>{dayjs(comment.date).format('MMMM YYYY')}</time>
      </div>
    </li>
  );
}

export default ReviewComment;
