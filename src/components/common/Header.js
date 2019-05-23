import React from 'react';
import { FaCity } from 'react-icons/fa';


const Header = () => {
  return (
    <header>
      <div className="brand">
        <FaCity className="brand__icon" />
        <span className="brand__typo">DirtyCity</span>
      </div>
    </header>
  )
}

export default Header;
