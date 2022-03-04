import React, {SyntheticEvent} from 'react';
import {CITIES_LIST} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {cityChange, filterOffers} from '../../store/action';

function CitiesList(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {CITIES_LIST.map((cityElement, index) => {
        const cityId = `${cityElement}-${index}`;

        return(
          <li key={cityId} className="locations__item">
            <a
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
                const target = e.target as HTMLAnchorElement;
                if (target.textContent) {
                  dispatch(cityChange(target.textContent));
                  dispatch(filterOffers());
                }
              }}
              className={`locations__item-link tabs__item ${city === cityElement ? 'tabs__item--active' : ''}`.trim()} href={`/${cityElement}`}
            >
              <span>{cityElement}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default CitiesList;
