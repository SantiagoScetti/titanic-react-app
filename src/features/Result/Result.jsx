import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import './Result.css';

function Result({ data }) {
  const survived = data.survived;
  const resultRef = useRef();

  const handleShare = async () => {
  const element = resultRef.current;

  try {
    // Capturamos el contenido original
    const canvasOriginal = await html2canvas(element, { scale: 2 });
    
    // Creamos un nuevo canvas donde dibujaremos la imagen + texto
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = canvasOriginal.width;
    finalCanvas.height = canvasOriginal.height;
    const ctx = finalCanvas.getContext("2d");

    // Dibujamos la imagen original
    ctx.drawImage(canvasOriginal, 0, 0);

    // Agregamos texto en la parte inferior
    const padding = 40;
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, finalCanvas.height - padding, finalCanvas.width, padding);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Simulador del Titanic - https://titanic-frontend.netlify.app/", finalCanvas.width / 2, finalCanvas.height - 10);

    // Convertimos a blob y compartimos
    const blob = await new Promise(resolve => finalCanvas.toBlob(resolve, 'image/png'));
    const file = new File([blob], 'titanic_result.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: '¿Sobrevivirías al Titanic?',
        text: '',
      });
    } else {
      alert("Tu navegador no soporta compartir imágenes. Se abrirá la imagen para descargar.");
      const url = URL.createObjectURL(blob);
      window.open(url);
    }
  } catch (err) {
    console.error("Error al compartir:", err);
  }
};


  return (
    <div className={`result-card ${survived ? 'survived' : 'not-survived'}`} ref={resultRef}>
      <h2>{survived ? '¡Sobreviviste!' : 'No sobreviviste!!!'}</h2>
      <h3>{data.name}</h3>
      <p className="message">{data.message}</p>

      <div className="result-stats">
        <p><span>⭐ Prob. de sobrevivir:</span> <strong>{data.probability_survive.toFixed(1)}%</strong></p>
        <p><span>💀 Prob. de no sobrevivir:</span> <strong>{data.probability_die.toFixed(1)}%</strong></p>
        <p><span>🎯 Confianza del modelo:</span> <strong>{data.confidence_level}</strong></p>
      </div>

      <div className="probability-bar">
        <div
          className="bar-survive"
          style={{ width: `${data.probability_survive}%` }}
        >
          {data.probability_survive > 10 && (
            <span>{data.probability_survive.toFixed(1)}%</span>
          )}
        </div>
        <div
          className="bar-die"
          style={{ width: `${data.probability_die}%` }}
        >
          {data.probability_die > 10 && (
            <span>{data.probability_die.toFixed(1)}%</span>
          )}
        </div>
      </div>


      <div className="share-hint" onClick={handleShare} style={{ cursor: 'pointer' }}>
        📲 Compartí tu resultado y desafiá a tus amigos en https://my-titanic-analisis.netlify.app/
      </div>
    </div>
  );
}

export default Result;