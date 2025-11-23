import React from "react";
import "../styling/Snackbar.css";

export const Snackbar: React.FC<{ snackbar: { message: string; type: "success" | "error" } | null }> = ({ snackbar }) => {
  if (!snackbar) return null;
  return <div className={`snackbar ${snackbar.type}`}>{snackbar.message}</div>;
};
