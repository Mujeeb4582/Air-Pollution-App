import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { BsMic } from 'react-icons/bs';

function Navbar() {
  const location = useLocation();
  return (
    <header className="d-flex justify-content-between p-3 fs-2 fw-bold">
      <div>
        <NavLink to="/">
          <IoIosArrowBack
            className="me-3 fs-1"
            style={{ color: 'white' }}
            data-testid="back-button"
          />
        </NavLink>
      </div>
      <div>
        {location.pathname !== '/' ? 'Details Report' : 'Air Pollution App'}
      </div>
      <div>
        <BsMic className="mx-3" />
        <FiSettings />
      </div>
    </header>
  );
}

export default Navbar;
