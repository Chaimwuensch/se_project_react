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

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);
  function handleOpenItem(item) {
    setSelectedCard(item);
    setActiveModal("item");
  }

  async function handleAddItem(item) {
    await api.createItem(item).then((res) => {
      console.log(res);
    });
  }

  async function handleDeleteItem(id) {
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

        <ModalWithForm
          isOpen={activeModal === "add"}
          name="add-clothes"
          title="New garment"
          onClose={handleCloseModal}
          onSubmit={(formData) => {
            handleAddItem(Object.fromEntries(formData));
          }}
        >
          {" "}
          <>
            <div className="modal-form__label_container">
              <label className="modal-form__label">
                Name
                <input
                  name="name"
                  type="text"
                  className="modal-form__input"
                  placeholder="Name"
                  required
                />
              </label>

              <label className="modal-form__label">
                Image
                <input
                  name="imageUrl"
                  type="url"
                  className="modal-form__input"
                  placeholder="Image URL"
                  required
                />
              </label>
            </div>
            <fieldset className="modal-form__fieldset">
              <legend className="modal-form__legend">
                Select the weather type:
              </legend>
              <label className="modal-form__radio-label-wrapper">
                <input
                  className="modal-form__radio-input"
                  type="radio"
                  name="weather"
                  value="Hot"
                />
                <span className="modal-form__radio-label">Hot</span>
              </label>

              <label className="modal-form__radio-label-wrapper">
                <input
                  className="modal-form__radio-input"
                  type="radio"
                  name="weather"
                  value="Warm"
                />
                <span className="modal-form__radio-label">Warm</span>
              </label>
              <label className="modal-form__radio-label-wrapper">
                <input
                  className="modal-form__radio-input"
                  type="radio"
                  name="weather"
                  value="Cold"
                />
                <span className="modal-form__radio-label">Cold</span>
              </label>
            </fieldset>
          </>
        </ModalWithForm>

        <ItemModal
          item={selectedCard}
          onClose={handleCloseModal}
          isOpen={activeModal === "item"}
        />
      </div>
    </CurrentTemperatureUnitProvider>
  );
}
