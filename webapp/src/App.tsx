import React from 'react';
import logo from './logo.svg';
import './App.css';
import ConfirmacionEdad from './components/ConfirmacionEdad';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarraNavegacion from './components/BarraNavegacion';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ConfirmacionEdad />} />
        <Route path='/products' element={<BarraNavegacion />} />
      </Routes>
    </Router>
  );
}

export default App;
