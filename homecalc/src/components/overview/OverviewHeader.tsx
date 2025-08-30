import React from "react";
import "../../styling/OverviewHeader.css";

type OverviewHeaderProps = {
  title: string;
  latestAmount?: number;
};

export const OverviewHeader: React.FC<OverviewHeaderProps> = ({ title, latestAmount }) => {
  return (
    <div className="overview-header">
      <div className="overview-header-title">{title}</div>
      <div className="overview-header-amount">
        {latestAmount !== undefined ? `€ ${latestAmount.toFixed(2)}` : "—"}
      </div>
    </div>
  );
};
