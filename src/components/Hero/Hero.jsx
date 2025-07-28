import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>¿Sobrevivirías al Titanic?</h1>
        <p>
          Completá el formulario y descubrí tu destino según un modelo de inteligencia artificial <strong>entrenado con datos reales del Titanic</strong>.
        </p>
        <p>
          Aprendé cómo funcionan los algoritmos de <em>Machine Learning</em> que usan las IA modernas. ¡Probá y compartí tu resultado!
        </p>

      </div>
      <img src={"/titanic1.jpg"} alt="Titanic Banner" className="hero-image" />
    </section>
  );
}

export default Hero;