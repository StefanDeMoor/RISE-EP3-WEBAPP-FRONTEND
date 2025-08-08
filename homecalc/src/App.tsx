import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeItem, setActiveItem] = useState('Create');

  const menuItems = ['Create', 'Customers', 'Products', 'Sales'];

  return (
    <div>
      <div className="topbar">
        <h1 className="logo">HomeCalc</h1>
      </div>

      <div className="main">
        <div className="sidebar">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item}
                className={activeItem === item ? 'active' : ''}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="sidebar-footer">
            <p>Calculate at home!</p>
            <p>For yourself or for your business.</p>
          </div>
        </div>

        <div className="content">

        </div>
      </div>
    </div>
  );
}

export default App;
