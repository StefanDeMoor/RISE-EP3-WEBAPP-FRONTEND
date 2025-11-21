import React, { useState } from "react";
import { CreateOverviewDialog } from "./overview/CreateOverviewDialog";
import { useAddOverview } from "../hooks/backend/overview/POST/useAddOverview";
import '../styling/EmptyMainSub.css'

type EmptyMainSubProps = {
  activeSubItem: string;
};

export const EmptyMainSub: React.FC<EmptyMainSubProps> = ({
  activeSubItem
}) => {
  const icons: Record<string, string> = {
    Overview: "/images/overview100blue.png",
    Saving: "/images/saving100blue.png",
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addOverview } = useAddOverview();

  const handleCreateClick = () => setIsDialogOpen(true);

  const handleCreate = (title: string, totalIncome: number) => {
    addOverview({ title, totalIncome})
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
