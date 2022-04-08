import {useAppDispatch, useAppSelector} from '../../hooks';
import {isFavoritesChangedState} from '../../store/data-process/data-process';
import {changeIsFavorite} from '../../store/async-actions';
import {Offer} from '../../types/offer';
import MiniSpinner from '../mini-spinner/mini-spinner';
import {AuthorizationStatus} from '../../const';

type BookmarkButtonProps = {
  offer: Offer;
  isPropertyPage?: boolean;
};

function BookmarkButton({offer, isPropertyPage}: BookmarkButtonProps): JSX.Element {
  const isFavoritesChanged = useAppSelector(({DATA}) => DATA.isFavoritesChanged);
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);
  const dispatch = useAppDispatch();
  const isFavorite = offer.isFavorite;

  let activeClassName;

  if (isFavorite && isPropertyPage && authorizationStatus === AuthorizationStatus.Authorize) {
    activeClassName = 'property__bookmark-button--active';
  } else if (isFavorite && !isPropertyPage && authorizationStatus === AuthorizationStatus.Authorize) {
    activeClassName = 'place-card__bookmark-button--active';
  } else {
    activeClassName = '';
  }

  return (
    <button
      className={`button ${isPropertyPage ? 'property__bookmark-button' : 'place-card__bookmark-button'} ${activeClassName}`.trim()}
      type="button"
      onClick={() => {
        const favoriteStatus = Number(!offer.isFavorite);
        dispatch(isFavoritesChangedState(false));
        dispatch(changeIsFavorite({
          isFavorite: favoriteStatus,
          id: String(offer.id),
          isPropertyPage: isPropertyPage,
        }));
      }}
      disabled={!isFavoritesChanged}
    >
      {isFavoritesChanged ?
        <svg className={`${isPropertyPage ? 'property__bookmark-icon' : 'place-card__bookmark-icon'}`} width={`${isPropertyPage ? '31' : '18'}`} height={`${isPropertyPage ? '33' : '19'}`}>
          <use xlinkHref="#icon-bookmark"/>
        </svg> :
        <MiniSpinner/>}
    </button>
  );
}

export default BookmarkButton;
