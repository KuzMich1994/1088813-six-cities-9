import React, {SyntheticEvent, useEffect, useState} from 'react';
import {sortingOffers} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {SORT_TYPES} from '../../const';

function SortSelect(): JSX.Element {
  const sortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const [activeSortElement, setActiveSortElement] = useState(0);

  const changeSelectIsOpen = () => {
    setSelectIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const closeSortSelect = (e: MouseEvent) => {
      const target = e.target as HTMLFormElement;
      if (!target.closest('.places__sorting')) {
        setSelectIsOpen(false);
      }
    };

    document.addEventListener('click', (e: MouseEvent) => closeSortSelect(e));

    return () => {
      document.removeEventListener('click', (e: MouseEvent) => closeSortSelect(e));
      setActiveSortElement(0);
    };
  }, [selectIsOpen]);

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
              className={`places__option ${activeSortElement === index ? 'places__option--active' : ''}`}
              data-sort-type={sortTypeName}
              tabIndex={0}
              onClick={(e: SyntheticEvent) => {
                const target = e.target as HTMLLIElement;
                if (target) {
                  if (target.dataset.sortType) {
                    dispatch(sortingOffers(target.dataset.sortType));
                    setActiveSortElement(index);
                  }
                }
                changeSelectIsOpen();
              }}
            >
              {sortType}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default SortSelect;
