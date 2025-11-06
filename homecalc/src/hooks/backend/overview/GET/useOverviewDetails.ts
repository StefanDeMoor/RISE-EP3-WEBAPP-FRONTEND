import { useEffect, useState } from "react";

export type SubAmount = {
  id: number;
  name: string;
  date: string;
  amount: number;
  sign: number; 
};

export type AmountItem = {
  id: number;
  name: string;
  date: string;
  amount: number;
  sign: number; 
  subAmounts: SubAmount[];
};

export const useOverviewDetails = (overviewId: number | null) => {
  const [amounts, setAmounts] = useState<AmountItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!overviewId) return;

    const fetchAmounts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5007/api/Amount/overview/${overviewId}`);
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        setAmounts(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch amounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAmounts();
  }, [overviewId]);

  return { amounts, loading, error };
};
