import React, { useState } from 'react';
import './App.css';

type CreateDataType = {
  Overview: string[];
  Test: string[];
  Saving: string[];
};

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Create');
  const [activeSubItem, setActiveSubItem] = useState<string>('Overview');

  const [createData, setCreateData] = useState<CreateDataType>({
    Overview: [],
    Test: [],
    Saving: [],
  });

  const handleAddItem = (category: keyof CreateDataType) => {
    setCreateData((prev) => ({
      ...prev,
      [category]: [...prev[category], `Nieuw item in ${category}`],
    }));
  };

  const menuItems: string[] = ['Create', 'Customers', 'Products', 'Sales'];
  const subSidebarVisible = activeItem === 'Create';

  return (
    <div>
      {/* Topbar */}
      <div className="topbar">
        <h1 className="logo">HomeCalc</h1>
      </div>

      <div className="main">
        {/* Sidebar links */}
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

        {/* Sub-sidebar */}
        {subSidebarVisible && (
          <div className="sub-sidebar">
            <ul className="sub-sidebar-menu">
              <li className="empty-li"></li>
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

        {/* Content */}
        <div className="content">
          {activeItem === 'Create' && (
            <>
              {createData[activeSubItem as keyof CreateDataType]?.length === 0 ? (
                <div className="empty-message">
                  <p>Nothing found in {activeSubItem}.</p>
                  <button
                    className="add-btn"
                    onClick={() => handleAddItem(activeSubItem as keyof CreateDataType)}
                  >
                    Create
                  </button>
                </div>
              ) : (
                <ul>
                  {createData[activeSubItem as keyof CreateDataType].map((entry, index) => (
                    <li key={index}>{entry}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
