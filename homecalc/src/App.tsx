import React from 'react';
import './App.css';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { SubSidebar } from './components/SubSidebar';
import { EmptyMainSub } from './components/EmptyMainSub';
import { OverviewPage } from './views/overview/OverviewPage';
import { useMenu } from './hooks/frontend/useMenu';

const App: React.FC = () => {
  const menuItems = ['Create', 'Customers', 'Products', 'Sales'];
  const { activeItem, setActiveItem } = useMenu('Create');
  const { activeItem: activeSubItem, setActiveItem: setActiveSubItem } = useMenu('Overview');

  return (
    <div>
      <Topbar />
      <div className="main">
        <Sidebar
          items={menuItems}
          activeItem={activeItem}
          onSelect={setActiveItem}
        />
        {activeItem === 'Create' && (
          <SubSidebar
            items={['Overview', 'Saving']}
            activeItem={activeSubItem}
            onSelect={(item) => setActiveSubItem(item)}
          />
        )}
        <div className="content">
          {activeItem === 'Create' && (() => {
            if (activeSubItem === 'Overview') {
              return <OverviewPage />;
            }
            return (
              <EmptyMainSub
                activeSubItem={activeSubItem}
              />
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default App;
