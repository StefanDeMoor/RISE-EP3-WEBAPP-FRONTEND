import React from "react";

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

  const icons: Record<string, string> = {
    Overview: "/images/overview100blue.png",
    Saving: "/images/saving100blue.png",
  };

  if (items.length === 0) {
    return (
      <div className="empty-message">
        <img
          src={icons[activeSubItem]}
          alt={activeSubItem}
          className="content-icon"
        />
        <p className="empty-message-title">
          You don't have any {activeSubItem.toLocaleLowerCase()}s yet
        </p>
        <p className="empty-message-subtitle">
          Start creating {activeSubItem.toLocaleLowerCase()}s by clicking on
          “Create {activeSubItem}”.
        </p>
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
