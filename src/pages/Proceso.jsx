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
                        <strong>Exploración y Limpieza de Datos:</strong> Primero analicé el dataset para entender qué información tenía. Eliminé columnas que no aportaban valor predictivo y manejé los datos faltantes. También creé nuevas características más útiles para el modelo.
                    </li>
                    <li>
                        <strong>Ingeniería de Características:</strong> Transformé los datos originales para que el modelo pudiera aprender mejor:
                        <ul className="transformaciones">
                            <li><strong>Tamaño de Familia:</strong> Combiné las columnas de hermanos/cónyuges y padres/hijos para crear una variable que represente el tamaño total de la familia viajando junta.</li>
                            <li><strong>Grupos de Familia:</strong> Clasifiqué a los pasajeros en categorías como "Solo", "Familia Pequeña", "Familia Mediana" y "Familia Grande", ya que estos grupos podrían tener diferentes tasas de supervivencia.</li>
                            <li><strong>Rangos de Edad:</strong> Dividí las edades en grupos más significativos en lugar de usar números exactos, lo que ayuda al modelo a encontrar patrones más claros.</li>
                            <li><strong>Títulos de Cortesía:</strong> Extraje títulos como "Mr.", "Mrs.", "Miss" de los nombres, ya que revelan información sobre género, estado civil y estatus social.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>División de Datos:</strong> Separé los datos en entrenamiento (80%) y validación (20%) usando estratificación para mantener la misma proporción de sobrevivientes en ambos conjuntos.
                    </li>
                    <li>
                        <strong>Preprocesamiento:</strong> Usé pipelines para tratar automáticamente los datos categóricos (con codificación ordinal y one-hot) y numéricos (rellenando valores faltantes con medianas).
                    </li>
                    <li>
                        <strong>Optimización del Modelo:</strong> Configuré un RandomForestClassifier y usé GridSearchCV para probar diferentes combinaciones de parámetros y encontrar la configuración óptima.
                    </li>
                    <li>
                        <strong>Entrenamiento Final:</strong> Entrené el modelo con los mejores parámetros encontrados usando todos los datos preprocesados.
                    </li>
                </ol>
            </section>

            <section>
                <h2>Explicación de los parámetros del Random Forest</h2>
                <p>Para que el Random Forest funcione bien, necesité ajustar varios parámetros. Aquí te explico qué hace cada uno:</p>
                
                <div>
                    <div>
                        <h3>🌳 n_estimators: 300</h3>
                        <p><strong>¿Qué es?</strong> La cantidad de árboles en el bosque.</p>
                        <p><strong>Analogía:</strong> Imagina que necesitas tomar una decisión importante. ¿Prefieres la opinión de 1 persona o de 300 personas expertas?</p>
                        <p><strong>En el modelo:</strong> Más árboles = predicciones más estables, pero también más tiempo de entrenamiento. 300 fue el punto óptimo. Cuando se aumentó la cantidad en 500 la presición del modelo bajó. Más árboles pueden hacer que el modelo capture más ruido en los datos, especialmente si el conjunto de datos es pequeño o tiene muchas características irrelevantes. Esto reduce la generalización y, por ende, la precisión en datos de prueba</p>
                    </div>

                    <div>
                        <h3>📏 max_depth: 15</h3>
                        <p><strong>¿Qué es?</strong> La profundidad máxima que puede tener cada árbol.</p>
                        <p><strong>Analogía:</strong> Es como limitar cuántas preguntas seguidas puede hacer cada árbol. "¿Es mujer?" → "¿Tiene menos de 30 años?" → "¿Viaja en primera clase?" → etc.</p>
                        <p><strong>En el modelo:</strong> 15 niveles permiten capturar patrones complejos sin memorizar datos específicos (sobreajuste).</p>
                    </div>

                    <div>
                        <h3>🍃 min_samples_leaf: 6</h3>
                        <p><strong>¿Qué es?</strong> El número mínimo de personas que debe haber en cada "hoja" del árbol.</p>
                        <p><strong>Analogía:</strong> No puedes hacer una regla basándote en muy pocas personas. Es como decir "necesito al menos 6 casos similares para estar seguro de mi predicción".</p>
                        <p><strong>En el modelo:</strong> Evita que el árbol haga predicciones basadas en casos muy específicos o raros.</p>
                    </div>

                    <div>
                        <h3>🔀 min_samples_split: 10</h3>
                        <p><strong>¿Qué es?</strong> El número mínimo de personas necesarias para dividir un grupo en dos.</p>
                        <p><strong>Analogía:</strong> No vale la pena hacer una nueva pregunta si solo tienes 5 personas. Mejor esperar a tener al menos 10 para que la división tenga sentido.</p>
                        <p><strong>En el modelo:</strong> Evita divisiones innecesarias cuando hay pocos datos.</p>
                    </div>

                    <div>
                        <h3>⚖️ criterion: "gini"</h3>
                        <p><strong>¿Qué es?</strong> La fórmula que usa cada árbol para decidir cuál es la mejor pregunta.</p>
                        <p><strong>Analogía:</strong> Es como tener una regla para elegir la pregunta que mejor separe a los sobrevivientes de los que no sobrevivieron.</p>
                        <p><strong>En el modelo:</strong> "Gini" mide qué tan "puro" queda cada grupo después de hacer una pregunta. Prefiere preguntas que dejen grupos más homogéneos.</p>
                    </div>
                </div>
            </section>

            <section className="resultados">
                <h2>En resumen</h2>
                <p>Los mejores parámetros encontrados fueron:</p>

                <pre>
                    <code>{`{
    criterion: "gini",
    max_depth: 15,
    min_samples_leaf: 6,
    min_samples_split: 10,
    n_estimators: 300
}`}
                    </code>
                </pre>

                <p>
                    Con estos parámetros, el modelo logró una <strong>precisión del 82.44%</strong> en los datos de validación.
                </p>

                <figure>
                    <img
                        src="/precicionnroarboles.png"
                        alt="Gráfico de Precisión vs. Número de Árboles"
                    />
                    <figcaption>Precisión vs. Número de Árboles</figcaption>
                </figure>
            </section>
        </article>
    );
}

export default Proceso;