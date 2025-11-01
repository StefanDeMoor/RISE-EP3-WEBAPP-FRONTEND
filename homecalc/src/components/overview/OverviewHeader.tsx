import React from "react";
import "../../styling/OverviewHeader.css";

type OverviewHeaderProps = {
  title: string;
  latestAmount?: number;
  expanded?: boolean; 
  onToggle?: () => void; 
};

export const OverviewHeader: React.FC<OverviewHeaderProps> = ({
  title,
  latestAmount,
  expanded = false,
  onToggle,
}) => {
  const iconSrc = expanded
    ? "/images/arrowUp50white.png"
    : "/images/arrowDown50white.png";

  return (
    <div className="overview-header">
      <div className="overview-header-title">{title.toUpperCase()}</div>

      <div className="overview-header-right" onClick={onToggle}>
        <div className="overview-header-amount">
          {latestAmount !== undefined ? `€ ${latestAmount.toFixed(2)}` : "—"}
        </div>
        <img src={iconSrc} alt="Toggle" className="overview-header-icon" />
      </div>
    </div>
  );
};
