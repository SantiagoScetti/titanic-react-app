import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Nav() {
  return (
    <nav className="nav">
      <ul className="list">
        <li><Link to="/" className="link">Test</Link></li>
        <li><Link to="/historia" className="link">Historia</Link></li>
        <li><Link to="/proceso"className="link" >Mi proceso</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;