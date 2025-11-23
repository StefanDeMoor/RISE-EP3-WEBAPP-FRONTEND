import React, { useState } from 'react';
import { CreateOverviewDialog } from './overview/CreateOverviewDialog';
import { useAddOverview } from '../hooks/backend/overview/POST/useAddOverview';
import "../styling/subsidebar/SubSidebar.css";

type SubSidebarProps = {
  items: string[];
  activeItem: string;
  onSelect: (item: string) => void;
  showSnackbar: (message: string, type: "success" | "error") => void; // ✅ toegevoegd
};

export const SubSidebar: React.FC<SubSidebarProps> = ({ items, activeItem, onSelect, showSnackbar }) => {
  const defaultIcons: Record<string, string> = {
    Overview: '/images/overview50white.png',
    Saving: '/images/saving50white.png',
  };

  const activeIcons: Record<string, string> = {
    Overview: '/images/overview50blue.png',
    Saving: '/images/saving50blue.png',
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addOverview } = useAddOverview();

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleCreate = async (title: string, totalIncome: number) => {
    try {
      await addOverview({ title, totalIncome });
      showSnackbar("Overview created successfully!", "success"); 
      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to create overview", "error");
    }
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
