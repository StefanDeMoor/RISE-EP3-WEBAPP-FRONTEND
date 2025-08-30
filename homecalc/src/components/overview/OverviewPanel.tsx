import React, { useState } from "react";
import { OverviewHeader } from "./OverviewHeader";
import "../../styling/overview/OverviewPanel.css";

type OverviewItem = {
  title: string;
  amount: number;
};

type OverviewPanelProps = {
  item: OverviewItem;
};

export const OverviewPanel: React.FC<OverviewPanelProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(true); // default open

  return (
    <div className="overview-panel">
      <OverviewHeader
        title={item.title}
        latestAmount={item.amount}
        expanded={expanded}
        onToggle={() => setExpanded(prev => !prev)}
      />

      {expanded && (
        <div className="overview-content">
          <div className="overview-table">
            <div className="overview-table-header">
              <div>Name</div>
              <div>Date</div>
              <div>Amount</div>
              <div className="overview-table-controls">
                <button className="icon-button">–</button>
                <button className="icon-button">+</button>
              </div>
            </div>

            <div className="overview-table-body">
              {/* Placeholder empty row */}
              <div className="overview-table-row empty-row">
                <div></div>
                <div></div>
                <div></div>
              </div>

              {/* Center message */}
              <div className="overview-empty-message">
                <img src="/images/calculatorIcon.png" alt="icon" />
                <p className="overview-empty-title">Start Calculating!</p>
              </div>
            </div>

            <div className="overview-table-footer">
              <div className="footer-label">TOTAL</div>
              <div className="footer-amount">€{item.amount.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
