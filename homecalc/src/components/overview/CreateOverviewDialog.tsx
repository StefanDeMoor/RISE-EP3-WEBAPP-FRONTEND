import React, { useState } from "react";
import "../../styling/overview/CreateOverviewDialog.css";

type CreateOverviewDialogProps = {
  onCancel: () => void;
  onCreate: (title: string, amount: number) => void;
};

export const CreateOverviewDialog: React.FC<CreateOverviewDialogProps> = ({
  onCancel,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleCreate = () => {
    const parsedAmount = parseFloat(amount);
    if (!title || isNaN(parsedAmount)) {
      alert("Please enter valid values");
      return;
    }
    onCreate(title, parsedAmount);
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog">
        <div className="dialog-header">Creating Overview</div>

        <div className="dialog-body">
          <div className="dialog-fields">
            <div className="dialog-field">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="dialog-field">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="dialog-actions">
            <button className="btn cancel" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn create" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
