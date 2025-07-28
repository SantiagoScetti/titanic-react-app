import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Nav() {
  const navRef = useRef(null);
  const ticking = useRef(false);

  // Función optimizada con requestAnimationFrame
  const updateNavbar = useCallback(() => {
    if (navRef.current) {
      if (window.scrollY > 50) {
        navRef.current.classList.add('scrolled');
      } else {
        navRef.current.classList.remove('scrolled');
      }
    }
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup del event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateNavbar]);

  // Función para scroll al top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  return (
    <nav className="nav" ref={navRef}>
      <ul className="list">
        <li><Link to="/" className="link" onClick={scrollToTop}>Test</Link></li>
        <li><Link to="/historia" className="link" onClick={scrollToTop}>Historia</Link></li>
        <li><Link to="/proceso" className="link" onClick={scrollToTop}>Mi proceso</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;