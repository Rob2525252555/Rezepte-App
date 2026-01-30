import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../redux/recipesSlice";
import { toggleFavorite } from "../redux/favoritesSlice";
import { Heart, ChevronDown } from "lucide-react"; 

/**
 * RecipeCard
 * 
 * Präsentiert ein einzelnes Rezept als Karte, inklusive:
 * Favoritenstatus
 * Detail-, Edit- und Löschaktionen
 * 
 * @param {{recipe: Recipe}} props 
 */

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Steuert den ein- und ausgeklappten Zustand der Detailansicht
  const [expanded, setExpanded] = useState(false);

  // Holt Favoriten IDs aus dem Redux Store als Array
  const favorites = useSelector((state) => state.favorites.items);

  // Gibt an ob dieses Rezept als Favorit markiert ist
  const isFavorite = favorites.includes(recipe._id);

  //Favoritenstatus umschalten/toggle
  const handleFavorite = () => {
    dispatch(toggleFavorite(recipe._id));
  };

  // Navigation zur Bearbeitungsseite eines Rezepts
  const handleEdit = () => navigate(`/recipes/${recipe._id}/edit`);

  // Navigation zur Detailseite eines Rezepts
  const handleDetails = () => navigate(`/recipes/${recipe._id}`);

  /**
   * Löscht das Rezept nach Bestätigung durch den Benutzer
   * und behandelt mögliche Fehler
   */
  const handleDelete = async () => {
    if (window.confirm("Willst du dieses Rezept wirklich löschen?")) {
      try {
        await dispatch(deleteRecipe(recipe._id)).unwrap();
      } catch (err) {
        console.error("Fehler beim Löschen:", err);
        alert("Das Rezept konnte nicht gelöscht werden.");
      }
    }
  };

  return (
    <div className="relative bg-white rounded-4xl shadow-md p-5 hover:shadow-xl transition duration-300 w-full max-w-sm">

      {/* Favoriten-Button */}
      <button
        onClick={handleFavorite}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
      >
        <Heart
          className={`w-6 h-6 ${
            isFavorite ? "fill-red-600 stroke-red-600" : "stroke-gray-500"
          }`}
        />
      </button>

      {/* Rezepttitel (öffnet Detailansicht) */}
      <h3
        onClick={handleDetails}
        className="text-xl font-bold text-amber-500 mb-2 cursor-pointer 
             hover:underline hover:text-amber-600 transition-colors duration-200 break-words"
      >
        {recipe.title}
      </h3>

      {/* Ein- und Ausklappbarer Infobereich */}
      <div
        className={`text-gray-700 overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-[600px]" : "max-h-[150px]"
        }`}
      >
        <p className="text-sm text-gray-600 mb-2 break-words">
          <strong>Kategorien:</strong> {recipe.categories?.join(", ") || "Keine"}
        </p>

        <div className="mb-2 break-words">
          <strong>Zutaten:</strong>
          <ul className="list-disc list-inside text-gray-600 break-words">
            {recipe.ingredients?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="text-gray-700 mb-2 break-words">
          <strong>Beschreibung:</strong>{" "}
          {recipe.description || "Keine Beschreibung"}
        </p>
      </div>

      {/* Ein-/Ausklappen Button mit animiertem Chevron für Infobereich */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-amber-500 mt-2 hover:underline text-sm font-medium select-none"
      >
        {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Aktionsbuttons */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <button
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
          onClick={handleDetails}
        >
          Details ansehen
        </button>

        <button
          onClick={handleEdit}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
        >
          Rezept bearbeiten
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Löschen
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
