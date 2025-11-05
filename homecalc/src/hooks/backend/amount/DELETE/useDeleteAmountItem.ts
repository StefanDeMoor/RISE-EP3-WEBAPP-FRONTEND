import { useState } from "react";

export const useDeleteAmountItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAmountItem = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5007/api/Amount/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete amount item (status ${response.status})`);
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete amount item");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteAmountItem, loading, error };
};
