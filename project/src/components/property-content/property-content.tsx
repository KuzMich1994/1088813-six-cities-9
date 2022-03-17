import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getOfferPoints, getRating, isAuthorize} from '../../utils/common';
import ReviewForm from '../review-form/review-form';
import Reviews from '../reviews/reviews';
import OfferList from '../offer-list/offer-list';
import MapComponent from '../map/map';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Spinner from '../spinner/spinner';
import {fetchCurrentOffer, fetchNeighborhoodOffers, getOfferReviews} from '../../store/async-actions';

type PropertyContentProps = {
  activeId: number | null;
  changeIsActive(id: number | null): void;
  removeActiveId(): void;
}

function PropertyContent({activeId, changeIsActive, removeActiveId}: PropertyContentProps): JSX.Element {

  const {id} = useParams<'id'>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentOffer(id));
      dispatch(fetchNeighborhoodOffers(id));
      dispatch(getOfferReviews(id));
    }
  }, [id, dispatch]);

  const currentOffer = useAppSelector(({DATA}) => DATA.currentOffer);
  const isDataLoaded = useAppSelector(({DATA}) => DATA.isDataLoaded);
  const neighborhoodOffers = useAppSelector(({DATA}) => DATA.neighborhoodOffers);
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);
  const offerReviews = useAppSelector(({REVIEWS}) => REVIEWS.offerReviews);

  const points = neighborhoodOffers && getOfferPoints(neighborhoodOffers);

  if (!isDataLoaded || !currentOffer || !neighborhoodOffers) {
    return <Spinner/>;
  }

  return (
    <>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {currentOffer.images.map((image, index) => {
              const imageId = `${image}-${index}`;
              return(
                <div key={imageId} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="studio" />
                </div>
              );
            },
            )}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {currentOffer.isPremium ?
              <div className="property__mark">
                <span>Premium</span>
              </div> :
              null}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {currentOffer.title}
              </h1>
              <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${getRating(currentOffer.rating)}%`}}/>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{currentOffer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {currentOffer.type.substring(0, 1).toUpperCase() + currentOffer.type.substring(1)}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {currentOffer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {currentOffer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{currentOffer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {currentOffer.goods.map((good) =>
                  (
                    <li key={good} className="property__inside-item">
                      {good}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper ${currentOffer.host.isPro ? 'property__avatar-wrapper--pro' : null} user__avatar-wrapper`}>
                  {currentOffer.host.avatarUrl ? <img className="property__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt={currentOffer.host.name} /> : null}
                </div>
                <span className="property__user-name">
                  {currentOffer.host.name}
                </span>
                {currentOffer.host.isPro ?
                  <span className="property__user-status">
                    Pro
                  </span> : null}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {currentOffer.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span></h2>
              {offerReviews ? <Reviews comments={offerReviews}/> : null}
              {isAuthorize(authorizationStatus) ? <ReviewForm/> : null}
            </section>
          </div>
        </div>
        <section className="property__map map">
          {points ? <MapComponent activeId={activeId} offers={neighborhoodOffers} points={points} mapSize={'92%'}/> : null}
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList
            offers={neighborhoodOffers}
            changeIsActive={changeIsActive}
            removeActiveId={removeActiveId}
            classNames={'near-places__list places__list'}
          />
        </section>
      </div>
    </>
  );
}

export default React.memo(PropertyContent);
