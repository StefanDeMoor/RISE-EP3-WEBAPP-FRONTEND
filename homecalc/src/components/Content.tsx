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
        <img src="/images/overview100blue.png" alt="overview" />
        <p>Start creating {activeSubItem.toLocaleLowerCase()}s by clicking on “Create {activeSubItem}”.</p>
        <button className="add-btn" onClick={() => onAdd(activeSubItem)}>
          Create {activeSubItem}
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
