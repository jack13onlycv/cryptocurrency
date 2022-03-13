/* eslint-disable react/prop-types */
import React from 'react';
import './curency.scss';

function Curency({ price, title }) {
  return (
    <li>
      <span>{ title }</span>
      <span> : </span>
      <span>{`$ ${(+price).toFixed(2)}`}</span>
    </li>
  );
}

export default Curency;
