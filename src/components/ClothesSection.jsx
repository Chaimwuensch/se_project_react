import React from "react";
import ItemCard from "./ItemCard";

export default function ClothesSection({ items = [], onItemClick, onDelete }) {
  return (
    <section className="clothes-section" style={{ padding: 16 }}>
      <h3>My Clothes</h3>
      {items.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))",
            gap: 12,
          }}
        >
          {items.map((it) => (
            <div key={it._id} style={{ padding: 8 }}>
              <ItemCard item={it} onClick={() => onItemClick(it)} />
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "center",
                  marginTop: 8,
                }}
              >
                <button
                  onClick={() => onDelete && onDelete(it._id)}
                  style={{ padding: "6px 8px" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
