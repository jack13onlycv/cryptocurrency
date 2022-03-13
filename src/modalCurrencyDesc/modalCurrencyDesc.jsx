/* eslint-disable react/button-has-type */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import millions from '../additional/additional';
import { addId } from '../features/briefReducer';
import './modalCurrencyDesc.scss';

function ModalCurrencyDesc({ modalItem }) {
  const dispatch = useDispatch();
  let symbol = modalItem.symbol?.toLowerCase() || 'btc';
  const [value, setValue] = useState(1);
  const url = `https://assets.coincap.io/assets/icons/${symbol}@2x.png`;
  const changeValue = (e) => setValue(e.target.value);

  useEffect(() => {
    setValue(1);
  }, [modalItem]);

  return (
    <div className="modal-currency-desc">
      <div className="modal-currency-desc__title">
        <img src={url} alt="pic" />
        {modalItem.name}
      </div>

      <div className="modal-currency-desc__table">
        <div>Rank: </div>
        <div>{modalItem.rank}</div>
        <div>Price: </div>
        <div>
          $
          {' '}
          {(+modalItem.priceUsd).toFixed(2)}
        </div>
        <div>VWAP (24Hr): </div>
        <div>
          $
          {' '}
          {(+modalItem.vwap24Hr).toFixed(2)}
        </div>
        <div>Change (24Hr): </div>
        <div>
          {(+modalItem.changePercent24Hr).toFixed(2)}
          %
        </div>
        <div>Supply:</div>
        <div>
          {millions(+modalItem.supply)}
        </div>
      </div>
      <div className="modal-currency-desc__add">
        <input
          type="number"
          step="0.01"
          value={value}
          min="0"
          onChange={changeValue}
        />
        <button onClick={() => {
          dispatch(addId({
            id: modalItem.id,
            name: modalItem.name,
            symbol: modalItem.symbol.toLowerCase(),
            amount: value,
            currPrice: modalItem.priceUsd * value,
          }));
        }}
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default ModalCurrencyDesc;
