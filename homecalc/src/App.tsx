import React from 'react';
import './App.css';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { SubSidebar } from './components/SubSidebar';
import { EmptyMainSub } from './components/EmptyMainSub';
import { OverviewPage } from './views/overview/OverviewPage';
import { useMenu } from './hooks/frontend/useMenu';
import { useSnackbar } from './hooks/useSnackbar';
import { Snackbar } from './components/Snackbar';

const App: React.FC = () => {
  const menuItems = ['Create', 'Customers', 'Products', 'Sales'];
  const { activeItem, setActiveItem } = useMenu('Create');
  const { activeItem: activeSubItem, setActiveItem: setActiveSubItem } = useMenu('Overview');

  const { snackbar, showSnackbar } = useSnackbar();

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
            showSnackbar={showSnackbar}  
          />
        )}
        <div className="content">
          {activeItem === 'Create' && (() => {
            if (activeSubItem === 'Overview') {
              return <OverviewPage showSnackbar={showSnackbar} />; 
            }
            return (
              <EmptyMainSub
                activeSubItem={activeSubItem}
              />
            );
          })()}
        </div>
      </div>

      {/* Snackbar altijd renderen */}
      <Snackbar snackbar={snackbar} />
    </div>
  );
};

export default App;
