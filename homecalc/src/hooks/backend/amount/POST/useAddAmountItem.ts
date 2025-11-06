import { useState } from "react";

export type NewAmountItem = {
  name: string;
  date: string;
  amount: number;
  sign: -1 | 1;
  overviewId: number;
};

export type CreatedAmountItem = {
  id: number;
  name: string;
  amount: number;
  date: string;                
  overviewId: number;
  parentAmountItemId?: number | null;
  subAmounts?: CreatedAmountItem[];
};

export const useAddAmountItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addAmountItem = async (newItem: NewAmountItem): Promise<CreatedAmountItem> => {
    setLoading(true);
    setError(null);

    try {
      const finalAmount = newItem.amount * newItem.sign;

      const formattedDate = newItem.date
        ? new Date(newItem.date).toISOString()
        : new Date().toISOString(); 

      const response = await fetch("http://localhost:5007/api/Amount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newItem.name,
          amount: finalAmount,
          overviewId: newItem.overviewId,
          date: formattedDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (!data.id) {
        throw new Error("Server did not return an ID for the created item");
      }

      return data as CreatedAmountItem;
    } catch (err: any) {
      setError(err.message || "Failed to add amount item");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addAmountItem, loading, error };
};
