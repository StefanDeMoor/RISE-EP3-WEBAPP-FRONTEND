import React from 'react';

type ContentProps = {
  activeSubItem: string;
  createData: Record<string, string[]>;
  onAdd: (category: string) => void;
};

export const Content: React.FC<ContentProps> = ({
  activeSubItem,
  createData,
  onAdd,
}) => {
  const items = createData[activeSubItem] || [];

  if (items.length === 0) {
    return (
      <div className="empty-message">
        <p>Nothing found in {activeSubItem}.</p>
        <button className="add-btn" onClick={() => onAdd(activeSubItem)}>
          Create Overview
        </button>
      </div>
    );
  }

  return (
    <ul>
      {items.map((entry, index) => (
        <li key={index}>{entry}</li>
      ))}
    </ul>
  );
};
