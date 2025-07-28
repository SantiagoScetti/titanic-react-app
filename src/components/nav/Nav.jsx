import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Nav() {
  const navRef = useRef(null);
  const ticking = useRef(false);

  // Función optimizada con requestAnimationFrame y histéresis
  const updateNavbar = useCallback(() => {
    if (navRef.current) {
      const scrollY = window.scrollY;
      const isScrolled = navRef.current.classList.contains('scrolled');
      
      // Histéresis: diferentes umbrales para añadir y quitar
      if (!isScrolled && scrollY > 80) {
        // Añadir la clase cuando pasa de 80px
        navRef.current.classList.add('scrolled');
      } else if (isScrolled && scrollY < 20) {
        // Quitar la clase cuando baja de 20px
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
        <li><Link to="/proyecto" className="link" onClick={scrollToTop}>Proyecto</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;