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
    }).then((res) => {
      console.log("Items fetched successfully");
      return this._checkResponse(res);
    });
  }

  createItem({ name, weather, imageUrl }) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, weather, imageUrl }),
    })
      .then((res) => {
        console.log("Create response status:", res.status);
        return this._checkResponse(res);
      })
      .then((newItem) => {
        console.log("Item created successfully:", newItem);
        return newItem;
      });
  }

  deleteItem(id) {
    const url = `${this._baseUrl}/items/${id}`;
    console.log("DELETE URL:", url);
    return fetch(url, {
      method: "DELETE",
    }).then(this._checkResponse);
  }
}

// Create an instance of the API
const api = new Api({
  baseUrl: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
