import React, {SyntheticEvent, useEffect, useState} from 'react';
import {sortingOffers} from '../../store/data-process/data-process';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {SORT_TYPES} from '../../const';

function SortSelect(): JSX.Element {
  const sortType = useAppSelector(({DATA}) => DATA.sortType);
  const selectedSortItem = useAppSelector(({DATA}) => DATA.selectedSortItem);
  const dispatch = useAppDispatch();
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  const changeSelectIsOpen = () => {
    setSelectIsOpen((prevState) => !prevState);
  };

  const closeSortSelect = (e: MouseEvent) => {
    const target = e.target as HTMLFormElement;
    if (!target.closest('.places__sorting')) {
      setSelectIsOpen(false);
    }

  };

  useEffect(() => {
    const effect = closeSortSelect;

    document.addEventListener('click', (e: MouseEvent) => effect(e));

    return () => {
      document.removeEventListener('click', (e: MouseEvent) => effect(e));
      setSelectIsOpen(false);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={changeSelectIsOpen} className="places__sorting-type" tabIndex={0}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${selectIsOpen ? 'places__options--opened' : ''}`.trim()}>
        {SORT_TYPES.map((sortTypeName, index) => {
          const sortTypIdx = `${sortTypeName}-${index}`;
          return (
            <li
              key={sortTypIdx}
              className={`places__option ${selectedSortItem === index ? 'places__option--active' : ''}`}
              data-sort-type={sortTypeName}
              tabIndex={0}
              onClick={(e: SyntheticEvent) => {
                const target = e.target as HTMLLIElement;
                if (target) {
                  if (target.dataset.sortType) {
                    dispatch(sortingOffers(target.dataset.sortType));
                  }
                }
                changeSelectIsOpen();
              }}
            >
              {sortTypeName}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default React.memo(SortSelect);
