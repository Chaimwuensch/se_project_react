export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      ...this._headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    await res.text();
    return Promise.reject(`Error: ${res.status}`);
  }

  getItems() {
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
    }).then((res) => this._checkResponse(res));
  }

  createItem({ name, weather, imageUrl }) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: this._getAuthHeaders(),
      body: JSON.stringify({ name, weather, imageUrl }),
    }).then((res) => this._checkResponse(res));
  }

  deleteItem(id) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: this._getAuthHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  likeItem(id) {
    return fetch(`${this._baseUrl}/items/${id}/likes`, {
      method: "PUT",
      headers: this._getAuthHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  unlikeItem(id) {
    return fetch(`${this._baseUrl}/items/${id}/likes`, {
      method: "DELETE",
      headers: this._getAuthHeaders(),
    }).then((res) => this._checkResponse(res));
  }
}

// Create an instance of the API
const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
