import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ sectionData, onAddNewClick, onCardClick }) => (
  <div className="clothes-section">
    <div className="clothes-section__info">
      <button className="clothes-section__button" onClick={onAddNewClick}>
        + Add new
      </button>
    </div>
    <ul className="clothes-section__list">
      {sectionData.length &&
        sectionData.map((card) => (
          <ItemCard key={card._id} card={card} onCardClick={onCardClick} />
        ))}
    </ul>
  </div>
);

export default ClothesSection;
