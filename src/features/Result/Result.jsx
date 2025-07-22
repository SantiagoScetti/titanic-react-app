import React from 'react';
import './Result.css';

function Result({ data }) {
  return (
    <div className="result-container">
      <h3>Resultado para {data.name}</h3>
      <p>{data.message}</p>
      <p>
        Probabilidad de supervivencia:{' '}
        <strong>{data.probability_survive.toFixed(1)}%</strong>
      </p>
      <p>
        Probabilidad de no sobrevivir:{' '}
        <strong>{data.probability_die.toFixed(1)}%</strong>
      </p>
      <p>Nivel de confianza: <strong>{data.confidence_level}</strong></p>
    </div>
  );
}

export default Result;