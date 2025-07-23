import React from 'react';
import './Proceso.css';

function Proceso() {
    return (
        <article className="proceso">
            <header>
                <h1>Mi Proceso de Entrenamiento</h1>
                <p className="intro">
                    Entrené un modelo de machine learning para predecir la supervivencia de pasajeros del Titanic usando Random Forest. Aquí te explico cómo lo hice y por qué elegí este método.
                </p>
            </header>

            <section>
                <h2>¿Por qué Random Forest?</h2>
                <p>
                    Elegí Random Forest porque es un método poderoso y flexible que combina muchos árboles de decisión para obtener predicciones más precisas y evitar el sobreajuste. Funciona bien con datos mixtos como los del Titanic (números y categorías) y me permitió analizar qué características eran más importantes.
                </p>
            </section>

            <section>
                <h2>¿Qué es un Árbol Binario de Decisión?</h2>
                <p>
                    Un árbol binario de decisión es un modelo que divide los datos en dos ramas en cada paso, basándose en preguntas como "¿Es hombre?" o "¿Tiene más de 30 años?". Estas divisiones crean una estructura de árbol que termina en una predicción (sobrevivió o no). Es útil en machine learning porque es simple y visualiza cómo se toman decisiones.
                </p>
                <figure>
                    <img
                        src="/DecisionTree.png"
                        alt="Ejemplo de Árbol Binario de Decisión"
                    />
                    <figcaption>Ejemplo de Árbol Binario de Decisión</figcaption>
                </figure>
            </section>

            <section>
                <h2>¿Qué es un Bosque Aleatorio?</h2>
                <p>
                    Un bosque aleatorio (Random Forest) es un grupo de árboles de decisión. Cada árbol se entrena con una muestra aleatoria de los datos y sus predicciones se combinan (por votación) para dar un resultado final. Esto lo hace más robusto y preciso que un solo árbol.
                </p>

                <div className="ventajas">
                    <h3>Ventajas:</h3>
                    <ul>
                        <li>Reduce el sobreajuste al promediar muchos árboles</li>
                        <li>Maneja bien datos complejos y ruidosos</li>
                        <li>Indica la importancia de cada característica (ej: el sexo fue clave en el Titanic)</li>
                    </ul>
                </div>

                <figure>
                    <img
                        src="/Random_Forest_Algorithm.webp"
                        alt="Diagrama de Bosque Aleatorio"
                    />
                    <figcaption>Diagrama del algoritmo Random Forest</figcaption>
                </figure>
            </section>

            <section>
                <h2>Cómo Entrené el Modelo</h2>
                <p>Usé los datos del Titanic y seguí estos pasos:</p>

                <ol>
                    <li>
                        <strong>Preparación de Datos:</strong> Eliminé columnas innecesarias (como 'Survived', 'SibSp', 'Parch') y dividí los datos en entrenamiento (80%) y validación (20%) con estratificación para mantener la proporción de sobrevivientes.
                    </li>
                    <li>
                        <strong>Preprocesamiento:</strong> Usé pipelines para tratar datos categóricos (con codificación ordinal y one-hot) y numéricos (imputando medianas).
                    </li>
                    <li>
                        <strong>Modelo:</strong> Configuré un RandomForestClassifier y usé GridSearchCV para probar combinaciones de parámetros como número de árboles (n_estimators), profundidad máxima (max_depth), etc.
                    </li>
                    <li>
                        <strong>Entrenamiento:</strong> Ajusté el modelo con los datos preprocesados.
                    </li>
                </ol>
            </section>

            <section className="resultados">
                <h2>Resultados</h2>
                <p>Los mejores parámetros encontrados fueron:</p>

                <pre><code>{`{
                    criterion: "gini",
                    max_depth: 15,
                    min_samples_leaf: 6,
                    min_samples_split: 10,
                    n_estimators: 300
                }`}</code></pre>

                <p>
                    Con estos parámetros, el modelo logró una <strong>precisión del 82.44%</strong> en los datos de validación.
                </p>

                <figure>
                    <img
                        src="./public/precicionnroarboles.png"
                        alt="Gráfico de Precisión vs. Número de Árboles"
                    />
                    <figcaption>Precisión vs. Número de Árboles</figcaption>
                </figure>
            </section>
        </article>
    );
}

export default Proceso;