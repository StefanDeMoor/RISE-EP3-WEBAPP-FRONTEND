import React from "react";
import { useOverviews } from "../../hooks/backend/overview/GET/useOverviews";
import { OverviewPanel } from "../../components/overview/OverviewPanel";

type OverviewPageProps = {
  showSnackbar: (message: string, type: "success" | "error") => void;
};

export const OverviewPage: React.FC<OverviewPageProps> = ({ showSnackbar }) => {
  const { overviews, loading, error } = useOverviews();

  if (loading) return <p>Loading overviews...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      {overviews.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          No overviews found in the database.
        </p>
      ) : (
        overviews.map((o) => (
          <OverviewPanel
            key={o.id}
            item={{
              id: o.id,
              title: o.title,
              amount: o.totalIncome ?? 0,
            }}
          />
        ))
      )}
    </div>
  );
};
