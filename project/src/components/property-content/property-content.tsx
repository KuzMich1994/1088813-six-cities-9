import React from 'react';
import {Offer} from '../../types/offer';
import {Navigate, useParams} from 'react-router-dom';
import {getRating} from '../../utils/common';
import {Comment} from '../../types/comment';
import ReviewForm from '../review-form/review-form';
import Reviews from '../reviews/reviews';
import Map from '../map/map';
import OfferList from '../offer-list/offer-list';

type PropertyContentProps = {
  offers: Offer[];
  comments: Comment[];
  activeId: number | null;
  changeIsActive(id: number | null): void;
  removeActiveId(): void;
}

function PropertyContent({offers, comments, activeId, removeActiveId, changeIsActive}: PropertyContentProps): JSX.Element {
  const {id} = useParams<'id'>();

  const offer = offers.find((o) => o.id === +(id || ''));

  if (!offer) {
    return <Navigate to='*'/>;
  }
  const neighborhoodOffers = offers.filter((o) => o.id !== +(id || ''));

  return (
    <>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.map((image, index) => {
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
            {offer.isPremium ?
              <div className="property__mark">
                <span>Premium</span>
              </div> :
              null}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
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
                <span style={{width: `${getRating(offer.rating)}%`}}/>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer.type.substring(0, 1).toUpperCase() + offer.type.substring(1)}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((good) =>
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
                <div className={`property__avatar-wrapper ${offer.host.isPro ? 'property__avatar-wrapper--pro' : null} user__avatar-wrapper`}>
                  {offer.host.avatarUrl ? <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt={offer.host.name} /> : null}
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                {offer.host.isPro ?
                  <span className="property__user-status">
                    Pro
                  </span> : null}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
              <Reviews comments={comments}/>
              <ReviewForm/>
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map currentOfferCity={offer.city} currentCityOffers={neighborhoodOffers} activeId={activeId} mapSize={'92%'}/>
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

export default PropertyContent;
