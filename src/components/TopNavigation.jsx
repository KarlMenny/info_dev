import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const TopNavigation = () => {
  return (
    <header>
      <Nav className="justify-content-center mb-5">
        <Nav.Item>
          <Link className="nav-link" to="/">
            Про мене
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to="/gallery">
            Галерея
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to="/contacts">
            Контакти
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to="/messages">
            Меседжі
          </Link>
        </Nav.Item>
      </Nav>
    </header>
  );
};

export default TopNavigation;
