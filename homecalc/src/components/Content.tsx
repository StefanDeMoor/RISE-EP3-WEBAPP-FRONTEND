import React, { useState } from "react";
import { CreateOverviewDialog } from "./overview/CreateOverviewDialog";

type ContentProps = {
  activeSubItem: string;
  createData: Record<string, string[]>;
  onAdd: (category: string, itemName: string) => void;
};

export const Content: React.FC<ContentProps> = ({ activeSubItem, createData, onAdd }) => {
  const items = createData[activeSubItem] || [];
  const icons: Record<string, string> = {
    Overview: "/images/overview100blue.png",
    Saving: "/images/saving100blue.png",
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateClick = () => setIsDialogOpen(true);

  const handleCreate = (title: string, amount: number) => {
    onAdd(activeSubItem, `${title} - ${amount}`);
    setIsDialogOpen(false);
  };

  return (
    <div>
      {items.length === 0 && !isDialogOpen && (
        <div className="empty-message">
          <img src={icons[activeSubItem]} alt={activeSubItem} className="empty-icon" />
          <p className="empty-message-title">
            You don't have any {activeSubItem.toLowerCase()}s yet
          </p>
          <p className="empty-message-subtitle">
            Start creating {activeSubItem.toLowerCase()}s by clicking on “Create {activeSubItem}”.
          </p>
          <button className="add-btn" onClick={handleCreateClick}>
            Create {activeSubItem}
          </button>
        </div>
      )}

      {isDialogOpen && (
        <CreateOverviewDialog
          onCancel={() => setIsDialogOpen(false)}
          onCreate={handleCreate}
        />
      )}

      {items.length > 0 && (
        <ul>
          {items.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
