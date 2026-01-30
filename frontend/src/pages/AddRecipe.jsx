import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../redux/recipesSlice";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

/**
 * Add-Recipe Seite
 * 
 * - Diese Seite enthält ein Formular um neue Rezepte zu erstellen
 * und diese in Redux und im Backend zu speichern
 * - Navigiert anschließend zurück zur Rezeptliste
 */

const AddRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.recipes.status);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRecipe = {
        title: title.trim(),
        description: description.trim(),
        categories: categories.split(",").map((c) => c.trim()),
        ingredients: ingredients.split(",").map((i) => i.trim()),
      };

      // Asynchrones Hinzufügen des Rezepts via Redux Thunk
      await dispatch(addRecipe(newRecipe)).unwrap();

      // Zurück zur Rezepte-Seite nach erfolgreichem Speichern
      navigate("/recipes");
    } catch (err) {
      console.error("Fehler beim Hinzufügen des Rezepts:", err);
    }
  };

  // Early Returns
  if (status === "loading") return <p>Rezept wird gespeichert...</p>;
  if (status === "failed") return <ErrorMessage />;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-amber-400">Neues Rezept hinzufügen</h2>

      {/*Formular zum Erstellen eines neuen Rezepts*/}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Beschreibung"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="Kategorien (kommagetrennt)"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Zutaten (kommagetrennt)"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
        >
          Rezept speichern
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;

