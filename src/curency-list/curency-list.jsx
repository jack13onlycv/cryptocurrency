/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../pagination/pagination';
import Modal from '../modal/modal';
import './curency-list.scss';
import { fetchCurenciesThunk, selectCurrencies } from '../features/fetchCurrencyReducer';
import ModalCurrencyDesc from '../modalCurrencyDesc/modalCurrencyDesc';

function CurencyList() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [modalItem, setModalItem] = useState({});

  const [offset, setOffset] = useState(0);
  const items = useSelector(selectCurrencies);

  const colorClass = (x) => (x > 0 ? 'green' : 'red');
  const addPlus = (x) => (x.startsWith('-') ? `${x} %` : `+${x} %`);

  const popup = (event) => {
    const el = event.target.parentElement;
    if (el.tagName.toLowerCase() === 'li') {
      setModalActive(true);
      setModalItem(items.find((item) => item.id === el.dataset.id));
    }
  };

  useEffect(() => {
    dispatch(fetchCurenciesThunk(offset));

    const interval = setInterval(() => {
      dispatch(fetchCurenciesThunk(offset));
    }, 100000);

    return () => clearInterval(interval);
  }, [dispatch, offset]);

  if (error) {
    return (
      <main>
        <div className="error">
          Error:
          {' '}
          {error.message}
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className="main-wrapper">
        <div className="curency-header">
          <div>Rank</div>
          <div>Name</div>
          <div>Price</div>
          <div>VWAP (24Hr)</div>
          <div>Change (24Hr)</div>
        </div>
        <ul onClick={popup}>
          {items.map((item) => (
            <li
              data-id={item.id}
              key={item.id}
              className="curency-item"
            >
              <div>{item.rank}</div>
              <div>{item.name}</div>
              <div>{`$ ${(+item.priceUsd).toFixed(2)}`}</div>
              <div>{(+item.vwap24Hr).toFixed(2)}</div>
              <div
                className={colorClass(+item.changePercent24Hr)}
              >
                {addPlus((+item.changePercent24Hr).toFixed(2))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        offset={offset}
        setOffset={setOffset}
      />
      <Modal active={modalActive} setActive={setModalActive}>
        {modalItem && <ModalCurrencyDesc modalItem={modalItem} />}
      </Modal>
    </main>
  );
}

export default CurencyList;
