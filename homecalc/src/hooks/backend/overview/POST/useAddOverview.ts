import { useState } from "react";

export type NewOverview = {
  title: string;
  totalIncome: number;
};

export type CreatedOverview = {
  id: number;
  title: string;
  totalIncome?: number | null;
  result?: number;
};

export const useAddOverview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addOverview = async (newOverview: NewOverview): Promise<CreatedOverview> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5007/api/Overview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newOverview.title,
          categoryId: 1,     
          totalIncome: newOverview.totalIncome,    
          result: newOverview.totalIncome          
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text}`);
      }

      const data = await response.json().catch(() => ({}));

      return data as CreatedOverview;
    } catch (err: any) {
      setError(err.message || "Failed to create overview");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addOverview, loading, error };
};
