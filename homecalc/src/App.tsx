import React from 'react';
import './App.css';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { SubSidebar } from './components/SubSidebar';
import { EmptyMainSub } from './components/EmptyMainSub';
import { useMenu } from './hooks/useMenu';
import { useCreateData } from './hooks/useCreateData';

const App: React.FC = () => {
  const menuItems = ['Create', 'Customers', 'Products', 'Sales'];

  const { activeItem, setActiveItem } = useMenu('Create');
  const { activeSubItem, setActiveSubItem, createData, addOverviewItem } = useCreateData();

  return (
    <div>
      <Topbar />
      <div className="main">
        <Sidebar items={menuItems} activeItem={activeItem} onSelect={setActiveItem} />

        {activeItem === 'Create' && (
          <SubSidebar
            items={['Overview', 'Saving']}
            activeItem={activeSubItem}
            onSelect={(item) => setActiveSubItem(item as any)}
          />
        )}

        <div className="content">
          {activeItem === 'Create' && (
            <EmptyMainSub
              activeSubItem={activeSubItem}
              createData={createData}
              onAdd={(category, title, amount) => addOverviewItem(category as any, title, amount)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
