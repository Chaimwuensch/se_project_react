import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../main/main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import { fetchWeather } from "../../utils/weatherApi";
import { API_KEY, DEFAULT_LAT, DEFAULT_LON } from "../../utils/constants";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";
import {
  CurrentUserProvider,
  useCurrentUser,
} from "../../contexts/CurrentUserContext";
import { api } from "../../utils/api";
import { getCurrentUser, getToken, removeToken } from "../../utils/auth";
import "./App.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__overlay" onClick={onClose}>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <p>
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>
          <div className="modal__buttons">
            <button
              className="modal__button modal__button_type_delete"
              onClick={onConfirm}
            >
              Yes, delete item
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

function AppContent() {
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
  const { setCurrentUser, isLoggedIn, setIsLoggedIn } = useCurrentUser();

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };

  // Check token on mount and restore user session
  useEffect(() => {
    const token = getToken();
    if (token) {
      getCurrentUser(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          removeToken();
          setIsLoggedIn(false);
        });
    }
  }, [setCurrentUser, setIsLoggedIn]);

  // Fetch weather on mount
  useEffect(() => {
    let mounted = true;

    async function loadUsingCoords(lat, lon) {
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
          { timeout: 7000 }
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

  useEffect(() => {
    api
      .getItems()
      .then((items) => {
        const normalized = items.map((it) => ({
          ...it,
          id: it.id || it._id,
          imageUrl: it.imageUrl || it.link,
          weather: (it.weather || "").toLowerCase(),
        }));
        setItems(normalized);
      })
      .catch(() => {
        const normalized = defaultClothingItems.map((it) => ({
          ...it,
          imageUrl: it.imageUrl || it.link,
          weather: (it.weather || "").toLowerCase(),
        }));
        setItems(normalized);
      });
  }, []);

  function handleOpenAdd() {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    setActiveModal("add");
  }

  function handleSignInClick() {
    setActiveModal("login");
  }

  const openConfirmationModal = () => {
    setCardToDelete(selectedCard);
    setActiveModal("delete-confirmation");
  };

  function handleOpenItem(item) {
    setSelectedCard(item);
    setActiveModal("item");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
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

  async function handleAddItem(item, resetForm) {
    try {
      const itemData = {
        name: item.name,
        imageUrl: item.imageUrl,
        weather: item.weather.toLowerCase(),
      };
      const newItem = await api.createItem(itemData);
      const normalizedNew = {
        ...newItem,
        id: newItem.id || newItem._id,
        imageUrl: newItem.imageUrl || newItem.link,
      };
      setItems((prev) => [normalizedNew, ...prev]);
      resetForm();
      handleCloseModal();
    } catch {
      alert("Failed to add item. Please try again.");
    }
  }

  const handleCardDelete = () => {
    const idToDelete = cardToDelete.id || cardToDelete._id;
    api
      .deleteItem(idToDelete)
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => (item.id || item._id) !== idToDelete)
        );
        handleCloseModal();
      })
      .catch(() => alert("Failed to delete item"));
  };

  const handleCardLike = async (id, isLiked) => {
    try {
      if (isLiked) {
        await api.unlikeItem(id);
      } else {
        await api.likeItem(id);
      }
      // Refetch items to get updated likes
      const updated = await api.getItems();
      const normalized = updated.map((it) => ({
        ...it,
        id: it.id || it._id,
        imageUrl: it.imageUrl || it.link,
        weather: (it.weather || "").toLowerCase(),
      }));
      setItems(normalized);
    } catch {
      alert("Failed to update like");
    }
  };

  const handleSignOut = () => {
    removeToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    handleCloseModal();
  };

  return (
    <CurrentTemperatureUnitProvider>
      <div className="page">
        <div className="page__wrapper">
          <Header
            handleAddClick={handleOpenAdd}
            handleSignInClick={handleSignInClick}
            location={weather?.city}
            weatherData={weather}
            onSignOut={handleSignOut}
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
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    cards={items}
                    onCardClick={handleCardClick}
                    onAddNewClick={() => setActiveModal("add")}
                    onCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
        <ItemModal
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
          onClose={handleCloseModal}
          onConfirm={handleCardDelete}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={handleCloseModal}
          onSwitchToRegister={() => setActiveModal("register")}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={handleCloseModal}
          onSwitchToLogin={() => setActiveModal("login")}
        />
      </div>
    </CurrentTemperatureUnitProvider>
  );
}

export default function App() {
  return (
    <CurrentUserProvider>
      <AppContent />
    </CurrentUserProvider>
  );
}
