import React, { useState } from "react";
import { OverviewHeader } from "./OverviewHeader";
import "../../styling/overview/OverviewPanel.css";

type OverviewItem = {
  title: string;
  amount: number;
};

type OverviewPanelProps = {
  item: OverviewItem;
};

type Row = {
  name: string;
  date: string;
  amount: number | "";
  sign: -1 | 1;
};

export const OverviewPanel: React.FC<OverviewPanelProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);

  const handleAddRow = (sign: -1 | 1) => {
    setRows([...rows, { name: "", date: "", amount: "", sign }]);
  };

  const handleRowChange = (index: number, field: string, value: string) => {
    const updateRows = [...rows];
    updateRows[index] = { ...updateRows[index], [field]: value };
    setRows(updateRows);
  };

  const totalAmount = rows.reduce(
    (acc, row) => acc + row.sign * (Number(row.amount) || 0),
    item.amount
  );

  return (
    <div className="overview-panel">
      <OverviewHeader
        title={item.title}
        latestAmount={item.amount}
        expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)}
      />

      {expanded && (
        <div className="overview-content">
          <div className="overview-table">
            <div className="overview-table-header">
              <div></div>
              <div>Name</div>
              <div>Date</div>
              <div>Amount</div>
              <div className="overview-table-controls">
                <button
                  className="icon-button"
                  onClick={() => handleAddRow(-1)}
                >
                  –
                </button>
                <button className="icon-button" onClick={() => handleAddRow(1)}>
                  +
                </button>
              </div>
            </div>

            <div className="overview-table-body">
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <div key={index} className="overview-table-row">
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={row.name}
                        onChange={(e) =>
                          handleRowChange(index, "name", e.target.value)
                        }
                        className="overview-input"
                      />
                    </div>
                    <div>
                      <input
                        type="date"
                        value={row.date}
                        onChange={(e) =>
                          handleRowChange(index, "date", e.target.value)
                        }
                        className="overview-input"
                      />
                    </div>
                    <div className="overview-amount-cell">
                      <div className="overview-amount-left">
                        <span className="overview-amount-sign">
                          {row.sign === -1 ? "-" : "+"}
                        </span>
                        <input
                          type="number"
                          placeholder="Amount"
                          value={row.amount}
                          onChange={(e) =>
                            handleRowChange(index, "amount", e.target.value)
                          }
                          className="overview-input"
                        />
                      </div>

                      <div className="overview-amount-actions">
                          <button className="icon-button edit-btn">
                            <i className="fa fa-pencil"></i>
                          </button>
                          <button className="icon-button delete-btn">
                            <i className="fa fa-trash"></i>
                          </button>
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
