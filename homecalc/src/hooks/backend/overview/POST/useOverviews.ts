import { useEffect, useState } from "react";

export type Overview = {
  id: number;
  title: string;
  totalIncome: number;
  result: number;
};

export const useOverviews = () => {
  const [overviews, setOverviews] = useState<Overview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverviews = async () => {
      try {
        const res = await fetch("http://localhost:5007/api/Overview");
        if (!res.ok) throw new Error("Failed to fetch overviews");
        const data = await res.json();
        setOverviews(
          data.map((o: any) => ({
            id: o.id,
            title: o.title,
            totalIncome: o.totalIncome ?? 0,
            result: o.result ?? 0,
          }))
        );
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load overviews");
      } finally {
        setLoading(false);
      }
    };

    fetchOverviews();
  }, []);

  return { overviews, loading, error };
};
