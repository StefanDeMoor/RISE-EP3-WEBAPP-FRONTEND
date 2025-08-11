import React, { useState, useEffect } from "react";
import "./App.css";

type Item = {
  name: string;
  amount: number;
  type: "income" | "expense";
};

type Category = {
  name: string;
  startAmount: number;
  items: Item[];
};

export default function App() {
  const [activeItem, setActiveItem] = useState("Create");
  const [activeSubItem, setActiveSubItem] = useState("Overview");

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryStart, setNewCategoryStart] = useState("");

  // currentCategoryIndex voor tabs selectie
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number | null>(
    categories.length > 0 ? 0 : null
  );

  const [newItem, setNewItem] = useState({ name: "", amount: "", type: "income" });

  // Editing state
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<{ catIndex: number; itemIndex: number } | null>(null);

  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryStart, setEditCategoryStart] = useState("");

  const [editItemData, setEditItemData] = useState({ name: "", amount: "", type: "income" });

  const menuItems = ["Create", "Customers", "Products", "Sales"];
  const subSidebarVisible = activeItem === "Create";

  // Zet currentCategoryIndex goed als categories veranderen
  useEffect(() => {
    if (categories.length === 0) {
      setCurrentCategoryIndex(null);
    } else if (
      currentCategoryIndex === null ||
      currentCategoryIndex >= categories.length
    ) {
      setCurrentCategoryIndex(0);
    }
  }, [categories, currentCategoryIndex]);

  // Category actions
  const addCategory = () => {
    if (!newCategoryName.trim() || !newCategoryStart) return;
    setCategories([
      ...categories,
      { name: newCategoryName, startAmount: parseFloat(newCategoryStart), items: [] },
    ]);
    setNewCategoryName("");
    setNewCategoryStart("");
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const saveEditedCategory = (index: number) => {
    const updated = [...categories];
    updated[index].name = editCategoryName;
    updated[index].startAmount = parseFloat(editCategoryStart);
    setCategories(updated);
    setEditingCategoryIndex(null);
  };

  // Item actions
  const addItemToCategory = (index: number) => {
    if (!newItem.name.trim() || !newItem.amount) return;
    const updated = [...categories];
    updated[index].items.push({
      name: newItem.name,
      amount: parseFloat(newItem.amount),
      type: newItem.type as "income" | "expense",
    });
    setCategories(updated);
    setNewItem({ name: "", amount: "", type: "income" });
    setCurrentCategoryIndex(null);
  };

  const startEditingItem = (catIndex: number, itemIndex: number) => {
    const item = categories[catIndex].items[itemIndex];
    setEditItemData({
      name: item.name,
      amount: item.amount.toString(),
      type: item.type,
    });
    setEditingItem({ catIndex, itemIndex });
  };

  const saveEditedItem = () => {
    if (!editingItem) return;
    const updated = [...categories];
    updated[editingItem.catIndex].items[editingItem.itemIndex] = {
      name: editItemData.name,
      amount: parseFloat(editItemData.amount),
      type: editItemData.type as "income" | "expense",
    };
    setCategories(updated);
    setEditingItem(null);
  };

  const calculateTotal = (cat: Category) => {
    const itemsTotal = cat.items.reduce(
      (sum, item) => sum + (item.type === "income" ? item.amount : -item.amount),
      0
    );
    return cat.startAmount + itemsTotal;
  };

  return (
    <div>
      <div className="topbar">
        <h1 className="logo">HomeCalc</h1>
      </div>

      <div className="main">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item}
                className={activeItem === item ? "active" : ""}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="sidebar-footer">
            <p>Calculate at home!</p>
            <p>For yourself or for your business.</p>
          </div>
        </div>

        {/* Sub-sidebar */}
        {subSidebarVisible && (
          <div className="sub-sidebar">
            <ul className="sub-sidebar-menu">
              <li className="empty-li"></li>
              {["Overview", "Test", "Saving"].map((item) => (
                <li
                  key={item}
                  className={activeSubItem === item ? "active" : ""}
                  onClick={() => setActiveSubItem(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content */}
        <div className="content">
          {activeItem === "Create" && activeSubItem === "Overview" && (
            <div className="overview-container">
              <h2>Categories</h2>
              <div className="add-category">
                <input
                  type="text"
                  placeholder="Nieuwe categorie naam"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Startbedrag"
                  value={newCategoryStart}
                  onChange={(e) => setNewCategoryStart(e.target.value)}
                />
                <button className="add-btn" onClick={addCategory}>
                  Toevoegen
                </button>
              </div>

              {categories.length > 1 ? (
                <div>
                  {/* Tabs */}
                  <div className="tabs" style={{ marginBottom: 16 }}>
                    {categories.map((cat, idx) => (
                      <button
                        key={idx}
                        className={currentCategoryIndex === idx ? "active-tab" : ""}
                        onClick={() => setCurrentCategoryIndex(idx)}
                        style={{
                          marginRight: 8,
                          padding: "6px 12px",
                          cursor: "pointer",
                          backgroundColor: currentCategoryIndex === idx ? "#ccc" : "#eee",
                          border: "1px solid #999",
                          borderBottom: currentCategoryIndex === idx ? "none" : "1px solid #999",
                        }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Content van de actieve categorie */}
                  {currentCategoryIndex !== null && categories[currentCategoryIndex] && (
                    <div className="category-card">
                      {editingCategoryIndex === currentCategoryIndex ? (
                        <div className="edit-category">
                          <input
                            type="text"
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                          />
                          <input
                            type="number"
                            value={editCategoryStart}
                            onChange={(e) => setEditCategoryStart(e.target.value)}
                          />
                          <button onClick={() => saveEditedCategory(currentCategoryIndex)}>Opslaan</button>
                          <button onClick={() => setEditingCategoryIndex(null)}>Annuleer</button>
                        </div>
                      ) : (
                        <div className="category-header">
                          <h3>{categories[currentCategoryIndex].name}</h3>
                          <div>
                            <span className={calculateTotal(categories[currentCategoryIndex]) >= 0 ? "positive" : "negative"}>
                              €{calculateTotal(categories[currentCategoryIndex]).toFixed(2)}
                            </span>
                            <button onClick={() => removeCategory(currentCategoryIndex)}>❌</button>
                            <button
                              onClick={() => {
                                setEditCategoryName(categories[currentCategoryIndex].name);
                                setEditCategoryStart(categories[currentCategoryIndex].startAmount.toString());
                                setEditingCategoryIndex(currentCategoryIndex);
                              }}
                            >
                              ✏️
                            </button>
                          </div>
                        </div>
                      )}

                      <p>Startbedrag: €{categories[currentCategoryIndex].startAmount.toFixed(2)}</p>

                      <ul>
                        {categories[currentCategoryIndex].items.map((item, i) =>
                          editingItem?.catIndex === currentCategoryIndex && editingItem?.itemIndex === i ? (
                            <li key={i}>
                              <input
                                type="text"
                                value={editItemData.name}
                                onChange={(e) =>
                                  setEditItemData({ ...editItemData, name: e.target.value })
                                }
                              />
                              <input
                                type="number"
                                value={editItemData.amount}
                                onChange={(e) =>
                                  setEditItemData({ ...editItemData, amount: e.target.value })
                                }
                              />
                              <select
                                value={editItemData.type}
                                onChange={(e) =>
                                  setEditItemData({ ...editItemData, type: e.target.value })
                                }
                              >
                                <option value="income">Inkomen</option>
                                <option value="expense">Uitgave</option>
                              </select>
                              <button onClick={saveEditedItem}>Opslaan</button>
                              <button onClick={() => setEditingItem(null)}>Annuleer</button>
                            </li>
                          ) : (
                            <li key={i}>
                              {item.name} – €{item.amount.toFixed(2)} ({item.type})
                              <button onClick={() => startEditingItem(currentCategoryIndex, i)}>✏️</button>
                            </li>
                          )
                        )}
                      </ul>

                      {currentCategoryIndex === currentCategoryIndex ? (
                        <div>
                          <input
                            type="text"
                            placeholder="Naam"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                          />
                          <input
                            type="number"
                            placeholder="Bedrag"
                            value={newItem.amount}
                            onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                          />
                          <select
                            value={newItem.type}
                            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                          >
                            <option value="income">Inkomen</option>
                            <option value="expense">Uitgave</option>
                          </select>
                          <button onClick={() => addItemToCategory(currentCategoryIndex)}>Opslaan</button>
                          <button onClick={() => setCurrentCategoryIndex(null)}>Annuleer</button>
                        </div>
                      ) : (
                        <button onClick={() => setCurrentCategoryIndex(currentCategoryIndex)}>Voeg item toe</button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                // Originele lijst-weergave als 0 of 1 categorie
                categories.map((cat, idx) => (
                  <div key={idx} className="category-card">
                    {editingCategoryIndex === idx ? (
                      <div className="edit-category">
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                        />
                        <input
                          type="number"
                          value={editCategoryStart}
                          onChange={(e) => setEditCategoryStart(e.target.value)}
                        />
                        <button onClick={() => saveEditedCategory(idx)}>Opslaan</button>
                        <button onClick={() => setEditingCategoryIndex(null)}>Annuleer</button>
                      </div>
                    ) : (
                      <div className="category-header">
                        <h3>{cat.name}</h3>
                        <div>
                          <span className={calculateTotal(cat) >= 0 ? "positive" : "negative"}>
                            €{calculateTotal(cat).toFixed(2)}
                          </span>
                          <button onClick={() => removeCategory(idx)}>❌</button>
                          <button
                            onClick={() => {
                              setEditCategoryName(cat.name);
                              setEditCategoryStart(cat.startAmount.toString());
                              setEditingCategoryIndex(idx);
                            }}
                          >
                            ✏️
                          </button>
                        </div>
                      </div>
                    )}

                    <p>Startbedrag: €{cat.startAmount.toFixed(2)}</p>

                    <ul>
                      {cat.items.map((item, i) =>
                        editingItem?.catIndex === idx && editingItem?.itemIndex === i ? (
                          <li key={i}>
                            <input
                              type="text"
                              value={editItemData.name}
                              onChange={(e) =>
                                setEditItemData({ ...editItemData, name: e.target.value })
                              }
                            />
                            <input
                              type="number"
                              value={editItemData.amount}
                              onChange={(e) =>
                                setEditItemData({ ...editItemData, amount: e.target.value })
                              }
                            />
                            <select
                              value={editItemData.type}
                              onChange={(e) =>
                                setEditItemData({ ...editItemData, type: e.target.value })
                              }
                            >
                              <option value="income">Inkomen</option>
                              <option value="expense">Uitgave</option>
                            </select>
                            <button onClick={saveEditedItem}>Opslaan</button>
                            <button onClick={() => setEditingItem(null)}>Annuleer</button>
                          </li>
                        ) : (
                          <li key={i}>
                            {item.name} – €{item.amount.toFixed(2)} ({item.type})
                            <button onClick={() => startEditingItem(idx, i)}>✏️</button>
                          </li>
                        )
                      )}
                    </ul>

                    {currentCategoryIndex === idx ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Naam"
                          value={newItem.name}
                          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                        <input
                          type="number"
                          placeholder="Bedrag"
                          value={newItem.amount}
                          onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                        />
                        <select
                          value={newItem.type}
                          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                        >
                          <option value="income">Inkomen</option>
                          <option value="expense">Uitgave</option>
                        </select>
                        <button onClick={() => addItemToCategory(idx)}>Opslaan</button>
                        <button onClick={() => setCurrentCategoryIndex(null)}>Annuleer</button>
                      </div>
                    ) : (
                      <button onClick={() => setCurrentCategoryIndex(idx)}>Voeg item toe</button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
