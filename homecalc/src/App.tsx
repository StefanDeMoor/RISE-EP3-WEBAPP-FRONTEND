import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeItem, setActiveItem] = useState('Create');
  const [activeSubItem, setActiveSubItem] = useState('Overview');

  const menuItems = ['Create', 'Customers', 'Products', 'Sales'];

  // 👇 Toegevoegd: laat sub-sidebar alleen zien bij "Create"
  const subSidebarVisible = activeItem === 'Create';

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
        {subSidebarVisible && (
          <div className="sub-sidebar">
            <ul className="sub-sidebar-menu">
              <li id='legeLi'>leeg</li>
              {['Overview', 'Test', 'Saving'].map((item) => (
                <li
                  key={item}
                  className={activeSubItem === item ? 'active' : ''}
                  onClick={() => setActiveSubItem(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="content">
          {/* Eventuele content die hoort bij selectie kan hier */}
        </div>
      </div>
    </div>
  );
}

export default App;
