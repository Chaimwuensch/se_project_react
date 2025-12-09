import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import { defaultClothingItems } from "../utils/defaultClothingItems";
import { fetchWeather } from "../utils/weatherApi";
import { API_KEY, DEFAULT_LAT, DEFAULT_LON } from "../utils/constants";

// App is the top-level wrapper for the whole application.
// It holds global UI state (modals, selected item, collection data, etc.)
import { CurrentTemperatureUnitProvider } from "../contexts/CurrentTemperatureUnitContext";

export default function App() {
  // Top-level UI state
  const [activeModal, setActiveModal] = useState(""); // '', 'add', 'item'
  const [selectedCard, setSelectedCard] = useState(null);
  const [items, setItems] = useState(defaultClothingItems);
  const [weather, setWeather] = useState({
    temp: undefined,
    city: "",
    day: false,
    condition: undefined,
  });
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherSource, setWeatherSource] = useState("");
  const [activeView, setActiveView] = useState("home"); // 'home' | 'profile'

  // Load weather on mount — prefer user geolocation, fall back to default coords
  useEffect(() => {
    let mounted = true;

    async function loadUsingCoords(lat, lon, label) {
      try {
        const res = await fetchWeather(lat, lon, API_KEY);
        if (!mounted) return;
        setWeather({
          temp: res.temp,
          city: res.city,
          day: res.day,
          condition: res.condition,
        });
        setWeatherLoading(false);
        setWeatherSource(label);
      } catch (err) {
        // if API call fails, fall back
        if (!mounted) return;
        setWeather({
          temp: 72,
          city: "Sample City",
          day: undefined,
          condition: undefined,
        });
        setWeatherLoading(false);
        setWeatherSource("fallback");
      }
    }

    async function init() {
      setWeatherLoading(true);

      // Try browser geolocation first — this will trigger the permission prompt
      if (navigator?.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            if (!mounted) return;
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            await loadUsingCoords(lat, lon, "geolocation");
          },
          // on error (permission denied, timeout) fall back to defaults
          async () => {
            if (!mounted) return;
            await loadUsingCoords(DEFAULT_LAT, DEFAULT_LON, "fallback");
          },
          { timeout: 7000 }
        );
      } else {
        // No geolocation support — use defaults
        await loadUsingCoords(DEFAULT_LAT, DEFAULT_LON, "fallback");
      }
    }

    init();
  }, []);

  function handleOpenAdd() {
    setActiveModal("add");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  function handleOpenItem(item) {
    setSelectedCard(item);
    setActiveModal("item");
  }

  function handleAddItem(item) {
    // ensure same shape as existing items
    const newItem = { _id: item._id || Date.now(), ...item };

    // Try to persist to API if available
    (async () => {
      try {
        const created = await api.createItem(item);
        // json-server may return `id` instead of `_id` — normalize
        const stored = {
          ...(created._id
            ? created
            : { _id: created._id || created.id, ...created }),
        };
        setItems((prev) => [stored, ...prev]);
      } catch (e) {
        // fallback to local add
        setItems((prev) => [newItem, ...prev]);
      }
      handleCloseModal();
    })();
  }

  async function handleDeleteItem(id) {
    // try server delete
    try {
      await api.deleteItem(id);
      setItems((prev) => prev.filter((it) => it._id !== id && it.id !== id));
    } catch (e) {
      // fallback to local delete
      setItems((prev) => prev.filter((it) => it._id !== id && it.id !== id));
    }
  }

  return (
    <CurrentTemperatureUnitProvider>
      <div className="app-root">
        <Header
          onAddClick={handleOpenAdd}
          location={weather?.city}
          onProfileClick={() => setActiveView("profile")}
        />

        <div className="container">
          {activeView === "home" ? (
            <Main
              items={items}
              onItemClick={handleOpenItem}
              weather={weather}
              weatherLoading={weatherLoading}
            />
          ) : (
            <Profile
              items={items}
              onBack={() => setActiveView("home")}
              onItemClick={handleOpenItem}
              onDelete={handleDeleteItem}
            />
          )}

          <Footer />
        </div>

        {/* Modals are controlled from App so they can layer over everything */}
        <ModalWithForm
          isOpen={activeModal === "add"}
          name="add-clothes"
          title="Add Clothes"
          buttonText="Add"
          onClose={handleCloseModal}
          onSubmit={(formData) => {
            // For now the formData might be FormData object from placeholder; just add a dummy item
            if (formData instanceof FormData) {
              handleAddItem({ name: "New item", weather: "warm", link: "" });
            } else {
              handleAddItem(formData);
            }
          }}
        />

        <ItemModal
          item={selectedCard}
          onClose={handleCloseModal}
          isOpen={activeModal === "item"}
        />
      </div>
    </CurrentTemperatureUnitProvider>
  );
}
