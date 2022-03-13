/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBrief, removeId } from '../features/briefReducer';
import './modalCurrencyBrief.scss';
import millions from '../additional/additional';

function ModalCurrencyBrief() {
  const dispatch = useDispatch();
  const itemsBrief = useSelector(selectBrief);

  return (
    <div className="modal-currency-brief">
      <div className="modal-currency-brief__title">&#128188;  Briefcase</div>
      <ul>
        {itemsBrief.map((item) => (
          <li key={item.id}>
            <img src={`https://assets.coincap.io/assets/icons/${item.symbol}@2x.png`} alt="pic" />
            <span>{item.name}</span>
            <span>
              Quantity:
              {' '}
              {item.amount}
            </span>
            <span>
              Amount:
              {' '}
              {millions(item.currPrice)}
            </span>
            <div
              className="modal-currency-brief__remove"
              onClick={() => dispatch(removeId(item.id))}
            >
              &#10060;
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModalCurrencyBrief;
