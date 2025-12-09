// Vite uses import.meta.env — use VITE_API_URL for client-side API base.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`error: ${res.status}`)
}

export function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

export async function getItems() {
  const res = await fetch(`${API_BASE}/items`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function createItem(item) {
  const res = await fetch(`${API_BASE}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete item");
  return true;
}

export default { getItems, createItem, deleteItem };
