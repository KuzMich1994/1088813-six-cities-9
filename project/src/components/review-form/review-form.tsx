import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {pushNewComment} from '../../store/async-actions';
import {useParams} from 'react-router-dom';
import {changeReviewsLoaded} from '../../store/action';

const STARS_MAX_COUNT = [
  5,
  4,
  3,
  2,
  1,
];

function ReviewForm(): JSX.Element {
  const {id} = useParams<'id'>();

  const {userData} = useAppSelector((state) => state);
  const initialState = {
    review: '',
    rating: '',
  };

  const [formData, setFormData] = useState(initialState);

  const dispatch = useAppDispatch();

  const fieldChangeHandle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setFormData({...formData, [name]: value});
  };

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userData && id) {
          dispatch(changeReviewsLoaded(false));
          dispatch(
            pushNewComment(
              {
                comment: formData.review,
                rating: +formData.rating,
                id: +id,
              },
            ),
          );
          setFormData(initialState);
        }
      }}
      className="reviews__form form" action="#" method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {STARS_MAX_COUNT.map((starCount) =>
          (
            <React.Fragment key={starCount}>
              <input onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value={starCount} id={`${starCount}-stars`} type="radio" checked={+formData.rating === starCount} />
              <label htmlFor={`${starCount}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"/>
                </svg>
              </label>
            </React.Fragment>
          ),
        )}
      </div>
      <textarea onChange={fieldChangeHandle} className="reviews__textarea form__textarea" value={formData.review} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        {formData.review.length >= 50 && formData.rating ?
          <button className="reviews__submit form__submit button" type="submit">Submit</button> :
          <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>}
      </div>
    </form>
  );
}

export default ReviewForm;
