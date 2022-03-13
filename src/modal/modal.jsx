/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './modal.scss';

function Modal({ active, setActive, children }) {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div
          className="modal__close"
          onClick={() => {
            setActive(false);
          }}
        >
          &#128939;
        </div>
      </div>
    </div>
  );
}

export default Modal;
