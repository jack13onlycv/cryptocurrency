/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Curency from '../curency/curency';
import fetchCurrencies from '../repositories/currency-repository';
import './header-curency.scss';

function HeaderCurency() {
  const [curency, setCurency] = useState([{}]);
  async function fetchTopCurrencies() {
    const data = await fetchCurrencies(0, 3);
    if (data.length === 3) setCurency(data);
  }

  useEffect(() => {
    fetchTopCurrencies();

    const interval = setInterval(() => {
      fetchTopCurrencies();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (curency[0].id) {
    return (
      <ul className="header__curency-group">
        { curency.map((item) => (
          <Curency
            key={item.id}
            title={item.name}
            price={item.priceUsd}
          />
        ))}
      </ul>
    );
  } return (
    <div className="header__curency-group">Loading...</div>
  );
}

export default HeaderCurency;
