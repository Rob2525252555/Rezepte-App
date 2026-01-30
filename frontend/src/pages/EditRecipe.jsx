import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, updateRecipe } from "../redux/recipesSlice";
import ErrorMessage from "../components/ErrorMessage";

/**
 * EditRecipe Page
 *
 * Ermöglicht das Bearbeiten eines vorhandenen Rezepts.
 * - Lädt Rezepte aus Redux oder Backend, falls noch nicht vorhanden
 * - Füllt das Formular mit den bestehenden Rezeptdaten
 * - Speichert Änderungen im Redux Store und Backend
 */

const EditRecipe = () => {

  // Rezept-ID aus der URL auslesen
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Rezepte(Array) und Status aus Redux Store holen
  const { items, status } = useSelector((state) => state.recipes);

  // Rezept anhand der ID finden
  const recipeFromStore = items.find((r) => r._id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [],
    categories: [],
  });

  // Falls Seite direkt geöffnet wird, Rezepte laden
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

  // Formulardaten aus Rezept übernehmen
  useEffect(() => {
    if (recipeFromStore) {
      setFormData({
        title: recipeFromStore.title || "",
        description: recipeFromStore.description || "",
        ingredients: recipeFromStore.ingredients || [],
        categories: recipeFromStore.categories || [],
      });
    }
  }, [recipeFromStore]);

  /**
   * Handler für normale Inputfelder (Text, Textarea)
   * @param {Event} e
   */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handler für Array-Felder (Zutaten, Kategorien)
   * Wandelt Komma-getrennte Strings in Arrays um
   * @param {Event} e
   * @param {string} field - "ingredients" oder "categories"
   */

  const handleArrayChange = (e, field) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Form Submit Handler
   * - Dispatch des updateRecipe Thunks
   * - Navigation zurück zur Detailseite
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateRecipe({ id, updatedData: formData })).unwrap();
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err);
    }
  };

  // Lade- und Fehlerzustände
  if (status === "loading") return <p>Lade Rezeptdaten...</p>;
  if (status === "failed") return <ErrorMessage />;
  if (status === "succeeded" && !recipeFromStore)
    return <p>Rezept nicht gefunden.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
  
      <h2 className="text-2xl font-bold text-amber-400 mb-4">Rezept bearbeiten</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Titel</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Kategorien (durch Komma getrennt)</label>
          <input
            type="text"
            value={formData.categories.join(",")}
            onChange={(e) => handleArrayChange(e, "categories")}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Zutaten (durch Komma getrennt)</label>
          <input
            type="text"
            value={formData.ingredients.join(",")}
            onChange={(e) => handleArrayChange(e, "ingredients")}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Beschreibung</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
          >
            Speichern
          </button>
          <button
            type="button"
            onClick={() => navigate(`/recipes/${id}`)}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
