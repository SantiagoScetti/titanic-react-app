import React from 'react';
import Button from '../button/Button';
import './Hero.css';
import image from '../../../public/titanic1.jpg';

function Hero() {
  return (
    <section className="hero">
      <div className="heroSection">
        <h1>¿Sobrevivirías al Titanic?</h1>
        <p>Completá el formulario y descubrí tu destino.</p>
        <Button />
      </div>
      <img src={image} alt="Banner Image" /> 
    </section>
  );
}

export default Hero;