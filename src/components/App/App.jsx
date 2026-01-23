import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../main/main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../AddItemModal/AddItemModal";
import ClothesSection from "../ClothesSection/ClothesSection";
import Profile from "../Profile/Profile";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import { fetchWeather } from "../../utils/weatherApi";
import { API_KEY, DEFAULT_LAT, DEFAULT_LON } from "../../utils/constants";
// App is the top-level wrapper for the whole application.
// It holds global UI state (modals, selected item, collection data, etc.)
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";
import { api } from "../../utils/api";
import "./App.css";

export default function App() {
  // Top-level UI state
  const [activeModal, setActiveModal] = useState(null); // '', 'add', 'item'
  const [selectedCard, setSelectedCard] = useState(null);
  const [items, setItems] = useState([]);
  const [weather, setWeather] = useState({
    temp: undefined,
    city: "",
    day: false,
    condition: undefined,
    temperature: { F: undefined, C: undefined },
  });
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherSource, setWeatherSource] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // fake auth flag for now – replace with real login later
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };
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
          temperature: res.temperature,
        });
        setWeatherLoading(false);
        setWeatherSource(label);
      } catch (err) {
        if (!mounted) return;
        setWeather({
          temp: 72,
          city: "Sample City",
          day: undefined,
          condition: undefined,
          temperature: { F: 72, C: 22 },
        });
        setWeatherLoading(false);
        setWeatherSource("fallback");
      }
    }

    async function init() {
      setWeatherLoading(true);
      if (navigator?.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            if (!mounted) return;
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            await loadUsingCoords(lat, lon, "geolocation");
          },
          async () => {
            if (!mounted) return;
            await loadUsingCoords(DEFAULT_LAT, DEFAULT_LON, "fallback");
          },
          { timeout: 7000 },
        );
      } else {
        await loadUsingCoords(DEFAULT_LAT, DEFAULT_LON, "fallback");
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // Load items on mount
  useEffect(() => {
    api
      .getItems()
      .then((items) => {
        setItems(items);
      })
      .catch((err) => {
        console.log(err);
        console.error("Raw error:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error message:", err.message);
        setItems(defaultClothingItems);
      });
  }, []);

  function handleOpenAdd() {
    setActiveModal("add");
  }

  function handleOpenItem(item) {
    setSelectedCard(item);
    setActiveModal("item");
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
    try {
      const itemData = {
        name: item.name,
        imageUrl:
          item.imageUrl === "http://localhost:3000/src/images/profile.png"
            ? "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png"
            : item.imageUrl,
        weather: item.weather.toLowerCase(),
      };
      console.log("Sending item data:", itemData);
      const newItem = await api.createItem(itemData);
      setItems((prev) => [...prev, newItem]);
    } catch (err) {
      console.error("Failed to add item:", err);
      // Fallback: create local item
      const localItem = {
        _id: Date.now(),
        name: item.name,
        imageUrl: item.imageUrl,
        weather: item.weather.toLowerCase(),
      };
      setItems((prev) => [...prev, localItem]);
    }
  }

  async function handleDeleteItem(id) {
    try {
      await api.deleteItem(id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (e) {
      // fallback to local delete
      setItems((prev) => prev.filter((it) => it.id !== id));
    }
  }
  return (
    <CurrentTemperatureUnitProvider>
      <div className="page">
        <div className="page__wrapper">
          <Header
            handleAddClick={handleOpenAdd}
            location={weather?.city}
            weatherData={weather}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  items={items}
                  onItemClick={handleOpenItem}
                  weather={weather}
                  weatherLoading={weatherLoading}
                />
              }
            />
            <Route
              path="/profile"
              element={
                items.length !== 0 && (
                  <Profile
                    cards={items}
                    onCardClick={handleCardClick}
                    onAddNewClick={() => setActiveModal("create")}
                  />
                )
              }
            />
          </Routes>

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
                  required
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
