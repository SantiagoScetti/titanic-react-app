import React from 'react';
import './Historia.css';

function Historia() {
    return (
        <div className="historia">
            <h1>La Historia del Titanic: Una Mirada a los Datos</h1>
            <p className="intro">
                El Titanic, un transatlántico considerado "insumergible", se hundió en abril de 1912 tras chocar con un iceberg. A través de los datos de los pasajeros, podemos entender quiénes tenían más probabilidades de sobrevivir y por qué. Analicé un dataset con información detallada de los pasajeros para descubrir patrones.
            </p>

            <h2>Contexto Histórico</h2>
            <p>
                El Titanic partió de Southampton, Inglaterra, con escalas en Cherburgo (Francia) y Queenstown (Irlanda). La tragedia reveló problemas de diseño, falta de botes salvavidas y desigualdades sociales. Los datos muestran cómo factores como la clase, el sexo, el tamaño de la familia, el puerto de embarque y la edad influyeron en la supervivencia.
            </p>
            <figure className='portada'>
                <img  src="/TitanicOriginal.jpg" alt="Fotografía del Titanic" />
                <figcaption>El RMS Titanic antes de su viaje inaugural en 1912.</figcaption>
            </figure>

            <h2>Supervivencia por Clase Social</h2>
            <div className="stats">
                <p>
                    La clase social fue un factor clave. Los pasajeros de primera clase tenían acceso a mejores botes salvavidas y ubicaciones en el barco, lo que aumentó sus chances de supervivencia:
                </p>
                <ul>
                    <li><strong>Primera Clase:</strong> 62.96% de supervivencia</li>
                    <li><strong>Segunda Clase:</strong> 47.28% de supervivencia</li>
                    <li><strong>Tercera Clase:</strong> 24.24% de supervivencia</li>
                </ul>
            </div>

            <h2>Supervivencia por Sexo</h2>
            <div className="stats">
                <p>
                    El protocolo de "mujeres y niños primero" marcó una gran diferencia. Las mujeres tuvieron una probabilidad mucho mayor de sobrevivir:
                </p>
                <ul>
                    <li><strong>Mujeres:</strong> 74.20% de supervivencia</li>
                    <li><strong>Hombres:</strong> 18.89% de supervivencia</li>
                </ul>
            </div>

            <h2>Visualización de Clase y Sexo</h2>
            <figure>
                <img src="/survival_chart1.png" alt="Gráfico de Supervivencia por Clase y Sexo" />
                <figcaption>Gráfico de tasas de supervivencia por clase y sexo.</figcaption>
            </figure>

            <h2>Supervivencia por Tamaño de Familia</h2>
            <div className="stats">
                <p>
                    El tamaño de la familia también influyó. Las familias pequeñas (2-4 personas) tuvieron mayores tasas de supervivencia, mientras que los pasajeros solos o en familias grandes enfrentaron mayores riesgos:
                </p>
                <ul>
                    <li><strong>Solo:</strong> 30.35% de supervivencia</li>
                    <li><strong>Pequeña (2-4):</strong> 57.88% de supervivencia</li>
                    <li><strong>Mediana (5-6):</strong> 16.22% de supervivencia</li>
                    <li><strong>Grande (7+):</strong> 16.00% de supervivencia</li>
                </ul>
            </div>
            <figure>
                <img src="/family_size_chart.png" alt="Gráfico de Supervivencia por Tamaño de Familia" />
                <figcaption>Gráfico de tasas de supervivencia por tamaño de familia.</figcaption>
            </figure>

            <h2>Supervivencia por Puerto de Embarque</h2>
            <div className="stats">
                <p>
                    El puerto de embarque reflejó diferencias socioeconómicas. Los pasajeros que embarcaron en Cherburgo, muchos de primera clase, tuvieron mayores tasas de supervivencia:
                </p>
                <ul>
                    <li><strong>Cherburgo:</strong> 55.36% de supervivencia</li>
                    <li><strong>Queenstown:</strong> 38.96% de supervivencia</li>
                    <li><strong>Southampton:</strong> 33.70% de supervivencia</li>
                </ul>
            </div>
            <figure>
                <img src="/embarked_chart.png" alt="Gráfico de Supervivencia por Puerto de Embarque" />
                <figcaption>Gráfico de tasas de supervivencia por puerto de embarque.</figcaption>
            </figure>

            <h2>Supervivencia por Rango de Edad</h2>
            <div className="stats">
                <p>
                    La edad también jugó un rol importante. Los niños (0-17 años) tuvieron una alta tasa de supervivencia debido al protocolo de prioridad, mientras que los adultos jóvenes y mayores variaron:
                </p>
                <ul>
                    <li><strong>0-17 años:</strong> 53.98% de supervivencia</li>
                    <li><strong>17-22 años:</strong> 31.36% de supervivencia</li>
                    <li><strong>22-27 años:</strong> 40.57% de supervivencia</li>
                    <li><strong>27-28 años:</strong> 29.21% de supervivencia</li>
                    <li><strong>28-29 años:</strong> 36.36% de supervivencia</li>
                    <li><strong>29-35 años:</strong> 45.13% de supervivencia</li>
                    <li><strong>35-45 años:</strong> 39.47% de supervivencia</li>
                    <li><strong>45-80 años:</strong> 36.89% de supervivencia</li>
                </ul>
            </div>
            <figure>
                <img src="/age_cut_chart.png" alt="Gráfico de Supervivencia por Rango de Edad" />
                <figcaption>Gráfico de tasas de supervivencia por rango de edad.</figcaption>
            </figure>

            <h2>Supervivencia por Rango de Tarifa</h2>
            <div className="stats">
                <p>
                    La tarifa pagada reflejó el estatus socioeconómico. Pasajeros que pagaron tarifas más altas, asociados con primera clase, tuvieron mayores tasas de supervivencia:
                </p>
                <ul>
                    <li><strong>0-7.775 USD:</strong> 20.51% de supervivencia</li>
                    <li><strong>7.775-8.662 USD:</strong> 19.08% de supervivencia</li>
                    <li><strong>8.662-14.454 USD:</strong> 36.69% de supervivencia</li>
                    <li><strong>14.454-26.0 USD:</strong> 43.62% de supervivencia</li>
                    <li><strong>26.0-52.369 USD:</strong> 41.78% de supervivencia</li>
                    <li><strong>52.369-512.329 USD:</strong> 69.80% de supervivencia</li>
                </ul>
            </div>
            <figure>
                <img src="/fare_cut_chart.png" alt="Gráfico de Supervivencia por Rango de Tarifa" />
                <figcaption>Gráfico de tasas de supervivencia por rango de tarifa.</figcaption>
            </figure>

            <h2>Supervivencia por Título</h2>
            <div className="stats">
                <p>
                    El título de los pasajeros indicó su estatus social o rol. Las mujeres casadas y solteras, junto con la nobleza, tuvieron altas tasas de supervivencia, mientras que los religiosos enfrentaron un destino trágico:
                </p>
                <ul>
                    <li><strong>Dr:</strong> 42.86% de supervivencia</li>
                    <li><strong>Master:</strong> 57.50% de supervivencia</li>
                    <li><strong>Mr:</strong> 15.67% de supervivencia</li>
                    <li><strong>Mujeres Casadas:</strong> 79.37% de supervivencia</li>
                    <li><strong>Militar:</strong> 40.00% de supervivencia</li>
                    <li><strong>Nobleza:</strong> 66.67% de supervivencia</li>
                    <li><strong>Religioso:</strong> 0.00% de supervivencia</li>
                    <li><strong>Mujeres Solteras:</strong> 70.11% de supervivencia</li>
                </ul>
            </div>
            <figure>
                <img src="/title_chart.png" alt="Gráfico de Supervivencia por Título" />
                <figcaption>Gráfico de tasas de supervivencia por título.</figcaption>
            </figure>

        </div>
    );
}

export default Historia;