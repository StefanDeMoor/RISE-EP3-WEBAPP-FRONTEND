import React from "react";
import { OverviewHeader } from "./OverviewHeader";

type OverviewItem = {
  title: string;
  amount: number;
};

type OverviewPanelProps = {
  item: OverviewItem;
};

export const OverviewPanel: React.FC<OverviewPanelProps> = ({ item }) => {
  return (
    <div className="overview-panel">
      <OverviewHeader title={item.title} latestAmount={item.amount} />
    </div>
  );
};
