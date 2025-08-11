import React from 'react';

type SidebarProps = {
  items: string[];
  activeItem: string;
  onSelect: (item: string) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ items, activeItem, onSelect }) => (
  <div className="sidebar">
    <ul>
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
    <div className="sidebar-footer">
      <p>Calculate at home!</p>
      <p>For yourself or for your business.</p>
    </div>
  </div>
);
