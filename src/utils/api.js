export function createCard() {
  // create a fetch request to the server, to create the card
}

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const text = await res.text();
    console.error("API Error:", res.status, text);
    return Promise.reject(`Error: ${res.status}`);
  }

  getItems() {
    console.log("Items URL:", `${this._baseUrl}/items`);
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
    }).then(this._checkResponse);
  }

  createItem({ name, weather, imageUrl }) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, weather, imageUrl }),
    }).then(this._checkResponse);
  }

  deleteItem(id) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
    }).then(this._checkResponse);
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
