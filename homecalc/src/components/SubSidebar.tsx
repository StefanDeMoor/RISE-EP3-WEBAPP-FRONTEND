import React, { useState } from 'react';
import { CreateOverviewDialog } from './overview/CreateOverviewDialog';
import "../styling/subsidebar/SubSidebar.css";

type SubSidebarProps = {
  items: string[];
  activeItem: string;
  onSelect: (item: string) => void;
};

export const SubSidebar: React.FC<SubSidebarProps> = ({ items, activeItem, onSelect }) => {
  const defaultIcons: Record<string, string> = {
    Overview: '/images/overview50white.png',
    Saving: '/images/saving50white.png',
  };

  const activeIcons: Record<string, string> = {
    Overview: '/images/overview50blue.png',
    Saving: '/images/saving50blue.png',
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleCreate = (title: string, amount: number) => {
    setIsDialogOpen(false);
  };

  return (
    <div className="sub-sidebar">
      <ul className="sub-sidebar-menu">
        <li className="empty-li"></li>
        {items.map(item => {
          const iconSrc = activeItem === item ? activeIcons[item] : defaultIcons[item];
          const itemStyle = {
            backgroundColor: activeItem === item ? 'white' : '#25466C',
            color: activeItem === item ? '#25466C' : 'white',
            fontWeight: activeItem === item ? 'bold' : 'normal',
          };

          return (
            <li
              key={item}
              style={itemStyle}
              className="sub-sidebar-item"
              onClick={() => onSelect(item)}
            >
              <span className="sub-sidebar-text">{item}</span>
              <img src={iconSrc} alt={`${item} icon`} className="sub-sidebar-icon" />
            </li>
          );
        })}
      </ul>

      <div className="sub-sidebar-footer">
        <button className="overview-btn" onClick={handleOpenDialog}>
          Create Overview
        </button>
      </div>

      {isDialogOpen && (
        <CreateOverviewDialog
          onCancel={handleCloseDialog}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
};
