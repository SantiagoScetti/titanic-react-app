import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Proceso from './pages/Proceso';
import Nav from './components/nav/Nav';
function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<div><h1>Historia</h1><p>Página en construcción</p></div>} />
          <Route path="/proceso" element={<Proceso />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;