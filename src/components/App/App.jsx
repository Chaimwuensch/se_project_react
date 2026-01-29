import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../main/main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
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

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__overlay">
        <div className="modal__content">
          <p>Are you sure you want to delete "{itemName}"?</p>
          <div className="modal__buttons">
            <button
              className="modal__button modal__button_type_delete"
              onClick={onConfirm}
            >
              Delete
            </button>
            <button
              className="modal__button modal__button_type_cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeModal, setActiveModal] = useState("");
  const [cardToDelete, setCardToDelete] = useState(null);
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
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

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

  async function handleAddItem(item) {
    try {
      const itemData = {
        name: item.name,
        imageUrl: item.imageUrl,
        weather: item.weather.toLowerCase(),
      };
      console.log("Sending item data:", itemData);
      const newItem = await api.createItem(itemData);
      console.log("Adding item to state:", newItem);
      setItems((prev) => {
        const updated = [...prev, newItem];
        console.log("Updated items array:", updated);
        return updated;
      });
      handleCloseModal();
    } catch (err) {
      console.error("Failed to add item:", err);
      // Fallback: create local item
      const localItem = {
        id: Date.now(),
        name: item.name,
        imageUrl: item.imageUrl,
        weather: item.weather.toLowerCase(),
      };
      setItems((prev) => [...prev, localItem]);
    }
  }

  // Handles the actual deletion after confirmation
  const handleCardDelete = () => {
    console.log("Attempting to delete item with ID:", cardToDelete.id);
    api
      .deleteItem(cardToDelete.id)
      .then(() => {
        // Filter out deleted card
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== cardToDelete.id),
        );
        // Close all modals and reset state
        closeActiveModal();
        setCardToDelete(null);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

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

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onDeleteClick={openConfirmationModal}
          item={selectedCard}
          onClose={handleCloseModal}
          isOpen={activeModal === "item"}
        />
        <AddItemModal
          activeModal={activeModal}
          handleCloseModal={handleCloseModal}
          handleAddItem={handleAddItem}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={closeActiveModal}
          onConfirm={handleCardDelete}
          itemName={cardToDelete?.name}
        />
      </div>
    </CurrentTemperatureUnitProvider>
  );
}
