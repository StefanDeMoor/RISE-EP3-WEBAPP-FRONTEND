import React from "react";
import { useOverviews } from "../../hooks/backend/overview/POST/useOverviews";
import { OverviewPanel } from "../../components/overview/OverviewPanel";

export const OverviewPage: React.FC = () => {
  const { overviews, loading, error } = useOverviews();

  if (loading) return <p>Loading overviews...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  if (overviews.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>No overviews found in the database.</p>
      </div>
    );
  }

  return (
    <div>
      {overviews.map((o) => (
        <OverviewPanel
          key={o.id}
          item={{
            id: o.id,
            title: o.title,
            amount: o.totalIncome ?? 0,
          }}
        />
      ))}
    </div>
  );
};
