import React from 'react';

type SubSidebarProps = {
  items: string[];
  activeItem: string;
  onSelect: (item: string) => void;
};

export const SubSidebar: React.FC<SubSidebarProps> = ({ items, activeItem, onSelect }) => (
  <div className="sub-sidebar">
    <ul className="sub-sidebar-menu">
      <li className="empty-li"></li>
      {items.map(item => (
        <li
          key={item}
          className={activeItem === item ? 'active' : ''}
          onClick={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);
