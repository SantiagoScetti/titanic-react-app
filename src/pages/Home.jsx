import React, { useState, useRef, useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import Form from '../features/form/Form';

import Result from '../features/Result/Result';
import './home.css'

function Home() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  // Scroll automático cuando aparece el resultado
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [result]);

  const handlePrediction = async (data) => {
  try {
    const response = await fetch('https://titanicbackendss.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }

    const resultData = await response.json();
    setResult(resultData);
    setError(null);
  } catch (error) {
    console.error('Error al predecir:', error);
    setError(error.message);
  }
};

  return (
    <>
      
      <Hero />
      {error && <p className="error">{error}</p>}
      <Form onSubmit={handlePrediction} />
      {result && <div ref={resultRef}><Result data={result} /></div>}
    </>
  );
}

export default Home;