import { useState, useCallback } from "react";

export type SnackbarType = "success" | "error";

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<{ message: string; type: SnackbarType } | null>(null);

  const showSnackbar = useCallback((message: string, type: SnackbarType = "success") => {
    setSnackbar({ message, type });
    setTimeout(() => setSnackbar(null), 3000);
  }, []);

  return { snackbar, showSnackbar };
};
