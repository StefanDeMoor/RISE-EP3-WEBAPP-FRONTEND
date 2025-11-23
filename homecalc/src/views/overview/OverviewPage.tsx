import React from "react";
import { OverviewPanel } from "../../components/overview/OverviewPanel";

type Overview = {
  id: number;
  title: string;
  totalIncome: number;
  result: number;
};

type OverviewPageProps = {
  showSnackbar: (message: string, type: "success" | "error") => void;
  overviews: Overview[];
  loading: boolean;
  error: string | null;
};

export const OverviewPage: React.FC<OverviewPageProps> = ({ showSnackbar, overviews, loading, error }) => {
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