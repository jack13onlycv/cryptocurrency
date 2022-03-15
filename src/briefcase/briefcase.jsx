/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBrief, selectBriefCounter } from '../features/briefReducer';
import { fetchCurrency } from '../repositories/currency-repository';
import './briefcase.scss';
import ModalCurrencyBrief from '../modalCurrencyDesc/modalCurrencyBrief';
import Modal from '../modal/modal';

function Briefcase() {
  const currPricesArr = useSelector(selectBrief);
  const currCounter = useSelector(selectBriefCounter);
  const [empty, setEmpty] = useState(true);
  const [amount, setAmount] = useState(0);
  const [diff, setDiff] = useState(0);
  const [modalActive, setModalActive] = useState(false);

  function totalAmount(pricesArr) {
    if (pricesArr.length === 0) {
      setEmpty(true);
      return 0;
    }
    setEmpty(false);
    return pricesArr.reduce((sum, item) => sum + item.currPrice, 0);
  }

  function findCurrency(id) {
    return currPricesArr.find((item) => item.id === id).amount;
  }

  function sumIds() {
    if (currPricesArr.length === 0) return '';
    return currPricesArr.reduce((sum, item, index, arr) => (sum + item.id + (index !== arr.length - 1 ? ',' : '')), '');
  }

  function diffAmount(prices) {
    if (currPricesArr.length === 0) {
      return 0;
    }
    return prices.reduce((sum, item) => sum + item.priceUsd * findCurrency(item.id), 0);
  }

  useEffect(async () => {
    setAmount(totalAmount(currPricesArr));
    if (currPricesArr.length !== 0) {
      const ids = sumIds();
      const prices = await fetchCurrency(ids);
      setDiff(diffAmount(prices));
    }
  }, [currPricesArr.length, currCounter]);

  const diffNumber = (amount - diff).toFixed(2);
  const diffPercent = ((amount / diff - 1) * 100).toFixed(2);

  const plus = () => (diffNumber.startsWith('-') ? diffNumber : `+${diffNumber}`);

  return (
    <>
      <div
        className="header__curency-briefcase"
        onClick={() => {
          setModalActive(true);
        }}
      >
        <span className="header__curency-briefcase-pic">&#128188;&nbsp;</span>
        {!empty
      && (
      <>
        <span className="header__curency-briefcase-amount">
          $
          {amount.toFixed(2)}
          &nbsp;
        </span>
        <span>
          {' '}
          {plus()}
          $
          {' '}

          {' '}
          (
          {diffPercent}
          %)
        </span>

      </>
      )}
        {empty && <span>Empty briefcase</span>}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        {modalActive && <ModalCurrencyBrief />}
      </Modal>
    </>
  );
}

export default Briefcase;
