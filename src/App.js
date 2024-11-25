import React from 'react';
import './App.css';
import Header from './components/Header';
import Controls from './components/Controls';
import MovementControls from './components/MovementControls';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Controls />
        <MovementControls />
      </div>
    </div>
  );
}

export default App;
