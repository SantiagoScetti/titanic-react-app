import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<div><h1>Historia</h1><p>Página en construcción</p></div>} />
          <Route path="/proceso" element={<div><h1>Mi proceso</h1><p>Página en construcción</p></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;