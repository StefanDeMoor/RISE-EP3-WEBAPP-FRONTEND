import React, { useRef, useState, useEffect } from "react";
import { OverviewHeader } from "./OverviewHeader";
import "font-awesome/css/font-awesome.min.css";
import "../../styling/overview/OverviewPanel.css";
import { useOverviewDetails } from "../../hooks/backend/overview/GET/useOverviewDetails";
import { useAddAmountItem } from "../../hooks/backend/amount/POST/useAddAmountItem";
import { useUpdateAmountItem, UpdateAmountItem } from "../../hooks/backend/amount/PUT/useUpdateAmountItem";
import { useDeleteAmountItem } from "../../hooks/backend/amount/DELETE/useDeleteAmountItem";
  
type OverviewItem = { id: number; title: string; amount: number; };
type OverviewPanelProps = { item: OverviewItem; };
type Row = { id: number; name: string; date: string; amount: number | ""; sign: -1 | 1; isEditing: boolean; };

export const OverviewPanel: React.FC<OverviewPanelProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const inputRefs = useRef<(HTMLElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const { amounts, loading, error } = useOverviewDetails(item.id);
  const { addAmountItem } = useAddAmountItem();
  const { updateAmountItem } = useUpdateAmountItem();
  const { deleteAmountItem } = useDeleteAmountItem();

  useEffect(() => {
    if (amounts.length > 0) {
      const mapped: Row[] = amounts.map(a => {
        const sign = a.amount < 0 ? -1 : 1;
        const absAmount = Math.abs(a.amount);
        let formattedDate = "";

        if (a.date && !a.date.startsWith("0001-01-01")) {
          const d = new Date(a.date);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, "0"); 
          const day = String(d.getDate()).padStart(2, "0");
          formattedDate = `${year}-${month}-${day}`;
        }


        return {
          id: a.id,
          name: a.name,
          date: formattedDate,
          amount: absAmount,
          sign: sign as -1 | 1,
          isEditing: false,
        };
      });
      setRows(mapped);
    }
  }, [amounts]);

  const handleAddRow = (sign: -1 | 1) => {
    setRows([...rows, { id: -1, name: "", date: "", amount: "", sign, isEditing: true }]);
    setFocusIndex(rows.length);
  };

  useEffect(() => {
    if (focusIndex !== null && inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex]?.focus();
      setFocusIndex(null);
    }
  }, [focusIndex]);

  const handleRowChange = (index: number, field: string, value: string) => {
    const updateRows = [...rows];
    updateRows[index] = { ...updateRows[index], [field]: value };
    setRows(updateRows);
  };

  const handleSaveRow = async (index: number) => {
    const row = rows[index];
    try {
      if (row.id === -1) {
        const savedItem = await addAmountItem({
          name: row.name,
          date: row.date,
          amount: Number(row.amount),
          sign: row.sign,
          overviewId: item.id,
        });

        const updatedRows = [...rows];
        updatedRows[index] = {
          ...row,
          id: savedItem.id,
          date: savedItem.date?.split("T")[0] || row.date,
          isEditing: false,
        };
        setRows(updatedRows);
      } else {
        const payload: UpdateAmountItem = {
          id: row.id,
          name: row.name,
          date: row.date,
          amount: Number(row.amount),
          sign: row.sign,
          overviewId: item.id,
        };

        const updatedItem = await updateAmountItem(payload);

        const updatedRows = [...rows];
        updatedRows[index] = {
          ...row,
          date: updatedItem?.date?.split("T")[0] || row.date,
          isEditing: false,
        };
        setRows(updatedRows);
      }
    } catch (err) {
      console.error("Failed to save amount item:", err);
    }
  };

  const handleEditRow = (index: number) => {
    const updatedRows = [...rows];
    updatedRows[index].isEditing = true;
    setRows(updatedRows);
    setFocusIndex(index);
  };

  const handleDiscardRow = (index: number) => {
    const updatedRows = [...rows];
    if (updatedRows[index].id === -1 && !updatedRows[index].name && !updatedRows[index].amount && !updatedRows[index].date)
      updatedRows.splice(index, 1);
    else updatedRows[index].isEditing = false;
    setRows(updatedRows);
  };

  const handleDeleteRow = async (index: number) => {
    const row = rows[index];
    if (row.id !== -1) {
      try { await deleteAmountItem(row.id); }
      catch (err) { console.error("Failed to delete amount item:", err); return; }
    }
    setRows(rows.filter((_, i) => i !== index));
  };

  const totalAmount = rows.reduce((acc, row) => acc + row.sign * (Number(row.amount) || 0), item.amount);

  return (
    <div className={`overview-panel ${expanded ? "expanded" : "collapsed"}`}>
      <OverviewHeader title={item.title} latestAmount={item.amount} expanded={expanded} onToggle={() => setExpanded(p => !p)} />
      {expanded && (
        <div className="overview-content">
          <div className="overview-table">
            <div className="overview-table-header">
              <div></div><div>Name</div><div>Date</div><div>Amount</div>
              <div className="overview-table-controls">
                <button className="icon-button" onClick={() => handleAddRow(-1)}>–</button>
                <button className="icon-button" onClick={() => handleAddRow(1)}>+</button>
              </div>
            </div>
            <div className="overview-table-body">
              {loading ? (
                <div className="overview-empty-message"><p>Loading data...</p></div>
              ) : error ? (
                <div className="overview-empty-message"><p style={{ color: "red" }}>Error: {error}</p></div>
              ) : rows.length > 0 ? (
                rows.map((row, index) => (
                  <div key={row.id ?? index} className="overview-table-row">
                    <div><input type="text" value={row.name} onChange={e => handleRowChange(index, "name", e.target.value)} className="overview-input" readOnly={!row.isEditing} ref={el => { inputRefs.current[index] = el; }} /></div>
                    <div><input type="date" value={row.date} onChange={e => handleRowChange(index, "date", e.target.value)} className="overview-input" readOnly={!row.isEditing} /></div>
                    <div className="overview-amount-cell">
                      <div className="overview-amount-left">
                        <span className="overview-amount-sign">{row.sign === -1 ? "-" : "+"}</span>
                        <input type="number" value={row.amount} onChange={e => handleRowChange(index, "amount", e.target.value)} className="overview-input" readOnly={!row.isEditing} />
                      </div>
                      <div className="overview-amount-actions">
                        {row.isEditing ? (
                          <>
                            <button className="icon-button save-btn" onClick={() => handleSaveRow(index)}><i className="fa fa-save"></i></button>
                            <button className="icon-button discard-btn" onClick={() => handleDiscardRow(index)}><i className="fa fa-rotate-left"></i></button>
                          </>
                        ) : (
                          <>
                            <button className="icon-button edit-btn" onClick={() => handleEditRow(index)}><i className="fa fa-pencil"></i></button>
                            <button className="icon-button delete-btn" onClick={() => handleDeleteRow(index)}><i className="fa fa-trash"></i></button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="overview-empty-message">
                  <img src="/images/calculator100blue.png" alt="icon" />
                  <p className="overview-empty-title">Start Calculating!</p>
                </div>
              )}
            </div>
            <div className="overview-table-footer">
              <div className="footer-label">TOTAL</div>
              <div className="footer-amount">€{totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
