import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <div className="topbar">
        <h1 className="logo">HomeCalc</h1>
      </div>

      <div className="main">
        <div className="sidebar">
          <ul>
            <li>Dashboard</li>
            <li>Instellingen</li>
            <li>Over</li>
          </ul>
        </div>

        <div className="content">
          <p>Welkom bij HomeCalc 🎉</p>
        </div>
      </div>
    </div>
  );
}

export default App;
