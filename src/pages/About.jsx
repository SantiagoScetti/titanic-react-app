import React from 'react';
import './About.css';

function TechIcon({ fileName, alt }) {
    return (
        <img
            src={`/icons/${fileName}`}
            alt={alt}
            className="tech-icon"
            loading="lazy"
            width="24"
            height="24"
        />
    );
}

const sections = [
    {
        title: 'Frontend: Interfaz de Predicción',
        description:
            'Interfaz web interactiva con React y Vite para predecir supervivencia en el Titanic. Desplegada en Netlify.',
        repo: {
            url: 'https://github.com/SantiagoScetti/titanic-react-app',
            label: 'Titanic-FrontEnd',
        },
        technologies: [
            { fileName: 'react.png', label: 'React' },
            { fileName: 'vite.png', label: 'Vite' },
            { fileName: 'axios.png', label: 'Axios' },
            { fileName: 'css.png', label: 'CSS' },
            { fileName: 'netlify.png', label: 'Netlify' },
        ],
    },
    {
        title: 'API: Backend de Predicción',
        description:
            'API con FastAPI para procesar datos y generar predicciones. Desplegada en Render.',
        repo: {
            url: 'https://github.com/SantiagoScetti/titanicBackend',
            label: 'Titanic-Backend',
        },
        apiLink: 'https://titanicbackendss.onrender.com/',
        technologies: [
            { fileName: 'python.png', label: 'Python' },
            { fileName: 'fastapi.png', label: 'FastAPI' },
            { fileName: 'pandas.png', label: 'Pandas' },
            { fileName: 'scikit-learn.png', label: 'Scikit-learn' },
            { fileName: 'render.png', label: 'Render' },
        ],
    },
    {
        title: 'EDA y Modelo de Machine Learning',
        description:
            'Análisis exploratorio y entrenamiento de un modelo Random Forest en Jupyter Notebook.',
        repo: {
            url: 'https://github.com/SantiagoScetti/titanic-eda',
            label: 'Titanic-EDA',
        },
        technologies: [
            { fileName: 'python.png', label: 'Python' },
            { fileName: 'pandas.png', label: 'Pandas' },
            { fileName: 'numpy.png', label: 'NumPy' },
            { fileName: 'scikit-learn.png', label: 'Scikit-learn' },
            { fileName: 'jupyter.png', label: 'Jupyter Notebook' },
            { fileName: 'matplotlib.png', label: 'Matplotlib' },
            { fileName: 'seaborn.png', label: 'Seaborn' },
        ],
    },
];

function About() {
    return (
        <div className="about-container">
            <h2>Detrás del Proyecto: Tecnologías y Desarrollo</h2>

            {sections.map((section, i) => (
                <section className="about-group" key={i}>
                    <h3 className="about-label">{section.title}</h3>
                    <p>{section.description}</p>
                    <p>
                        <strong>Repositorio</strong>:{' '}
                        <a href={section.repo.url} target="_blank" rel="noopener noreferrer">
                            {section.repo.label}
                        </a>
                    </p>
                    {section.apiLink && (
                        <p>
                            <strong>Link a la API:</strong>{' '}
                            <a href={section.apiLink} target="_blank" rel="noopener noreferrer">
                                {section.apiLink}
                            </a>
                        </p>
                    )}
                    <p>
                        <strong>Tecnologías</strong>:
                    </p>
                    <div className="tech-grid">
                        {section.technologies.map((tech, j) => (
                            <div className="tech-item" key={j}>
                                <TechIcon fileName={tech.fileName} alt={tech.label} />
                                <span className="tech-label">{tech.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
            <footer className="about-footer">
                <p>
                    Desarrollado por{' '}
                    <a
                        href="https://www.linkedin.com/in/santiago-scetti/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-link"
                    >
                        Santiago Scetti
                    </a>
                </p>
            </footer>


        </div>
    );
}

export default About;