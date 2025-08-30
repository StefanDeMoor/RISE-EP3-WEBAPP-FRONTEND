import React from 'react';

type SidebarProps = {
  items: string[];
  activeItem: string;
  onSelect: (item: string) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ items, activeItem, onSelect }) => {
  const defaultIcons: Record<string, string> = {
    Create: '/images/create50white.png',
    Customers: '/images/customer50white.png',
    Products: '/images/product50white.png',
    Sales: '/images/sales50white.png',
  };

  const activeIcons: Record<string, string> = {
    Create: '/images/create50blue.png',
    Customers: '/images/customer50gray.png',
    Products: '/images/product50brown.png',
    Sales: '/images/sales50gold.png',
  };

  const bgColors: Record<string, string> = {
    Create: '#25466C', 
    Customers: '#47536B', 
    Products: '#753742CF', 
    Sales: '#D4AF37',   
  };

  const textColors: Record<string, string> = {
    Create: '#25466C',
    Customers: '#47536B',
    Products: '#753742CF',
    Sales: '#D4AF37',
  };

  return (
    <div className="sidebar">
      <ul>
        {items.map(item => {
          const iconSrc = activeItem === item ? activeIcons[item] : defaultIcons[item];
          const itemStyle = {
            backgroundColor: activeItem === item ? 'white' : bgColors[item],
            color: activeItem === item ? textColors[item] : 'white',
            fontWeight: activeItem === item ? 'bold' : 'normal',
          };

          return (
            <li
              key={item}
              className="sidebar-item"
              style={itemStyle}
              onClick={() => onSelect(item)}
            >
              <span className="sidebar-text">{item}</span>
              <img src={iconSrc} alt={`${item} icon`} className="sidebar-icon" />
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <p>Calculate at home!</p>
        <p>For yourself or for your business.</p>
      </div>
    </div>
  );
};
