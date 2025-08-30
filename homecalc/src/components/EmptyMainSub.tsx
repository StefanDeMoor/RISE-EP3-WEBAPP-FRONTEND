import React, { useState } from "react";
import { CreateOverviewDialog } from "./overview/CreateOverviewDialog";

type EmptyMainSubProps = {
  activeSubItem: string;
  createData: Record<string, { title: string; amount: number }[]>;
  onAdd: (category: string, title: string, amount: number) => void;
};

export const EmptyMainSub: React.FC<EmptyMainSubProps> = ({
  activeSubItem,
  createData,
  onAdd
}) => {
  const icons: Record<string, string> = {
    Overview: "/images/overview100blue.png",
    Saving: "/images/saving100blue.png",
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateClick = () => setIsDialogOpen(true);

  const handleCreate = (title: string, amount: number) => {
    onAdd(activeSubItem, title, amount);
    setIsDialogOpen(false);
  };

  return (
    <div className="empty-message-wrapper">
      {!isDialogOpen && (
        <div className="empty-message">
          <img
            src={icons[activeSubItem]}
            alt={activeSubItem}
            className="empty-icon"
          />
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
    </div>
  );
};
