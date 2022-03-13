/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import './pagination.scss';

function Pagination({ offset, setOffset }) {
  const checkLimitOffset = (ofst) => {
    if (ofst < 0) return 0;
    if (ofst > 229) return 229;
    return ofst;
  };

  function handleChange(event) {
    setOffset(checkLimitOffset(+event.target.value - 1));
  }

  return (
    <div className="pagination">
      <div
        onClick={() => setOffset(checkLimitOffset(offset - 1))}
        className="pagination__button minus"
      />
      <input
        className="pagination__counter"
        type="text"
        value={offset + 1}
        onChange={handleChange}
      />
      <div
        onClick={() => setOffset(checkLimitOffset(offset + 1))}
        className="pagination__button plus"
      />
    </div>
  );
}

export default Pagination;
