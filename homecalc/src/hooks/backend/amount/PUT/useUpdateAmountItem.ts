import { useState } from "react";

export type UpdateAmountItem = {
    id: number;
    name: string;
    date: string;
    amount: number;
    sign: -1 | 1;
    overviewId: number;
};

export const useUpdateAmountItem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateAmountItem = async (item: UpdateAmountItem) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5007/api/Amount/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: item.id,
                    name: item.name,
                    date: new Date(item.date || "0001-01-01").toISOString(),
                    amount: item.amount * item.sign,
                    overviewId: item.overviewId,
                    subAmounts: [],
                }),
            });

            if (!response.ok) throw new Error(`Server returned ${response.status}`);

            return response.status === 204 ? null : await response.json();
        } catch (err: any) {
            setError(err.message ?? "Failed to update amount item");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateAmountItem, loading, error };
};
