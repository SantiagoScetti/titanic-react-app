import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Proceso from './pages/Proceso';
import Nav from './components/nav/Nav';
import Historia from './pages/Historia';

function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia"element={<Historia />} />
          <Route path="/proceso" element={<Proceso />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;