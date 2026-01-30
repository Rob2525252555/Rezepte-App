import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, deleteRecipe } from "../redux/recipesSlice";
import { toggleFavorite } from "../redux/favoritesSlice";
import { Heart } from "lucide-react";
import ErrorMessage from "../components/ErrorMessage";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.recipes);
  const favorites = useSelector((state) => state.favorites.items);
  const recipe = items.find((r) => r._id === id);
  const isFavorite = favorites.includes(id);

  //  Wenn Seite direkt geöffnet wird → Rezepte nachladen
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

  const handleDelete = async () => {
    if (window.confirm("Willst du dieses Rezept wirklich löschen?")) {
      await dispatch(deleteRecipe(id));
      navigate("/recipes");
    }
  };

  const handleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  if (status === "loading") return <p>Lade Rezept...</p>;
  if (status === "failed") return <ErrorMessage />;
  if (status === "succeeded" && !recipe)
    return (
      <div className="text-center p-8">
        <p className="text-gray-700 mb-4">Rezept nicht gefunden.</p>
        <button
          onClick={() => navigate("/recipes")}
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
        >
          Zurück zur Übersicht
        </button>
      </div>
    );

  if (!recipe) return null;

  return (
    <div className="relative bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto">
      {/* Herz */}
      <button
        onClick={handleFavorite}
        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
      >
        <Heart
          className={`w-7 h-7 ${
            isFavorite ? "fill-red-600 stroke-red-600" : "stroke-gray-500"
          }`}
        />
      </button>

      <h1 className="text-2xl font-bold text-amber-400 mb-4 break-words">{recipe.title}</h1>

      <p className="mb-3 break-words">
        <strong>Kategorien:</strong>{" "}
        {recipe.categories?.join(", ") || "Keine Kategorien"}
      </p>

      <div className="mb-3">
        <strong>Zutaten:</strong>
        <ul className="list-disc list-inside text-gray-600 break-words">
          {recipe.ingredients?.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>

      <p className="mb-3 break-words">
        <strong>Beschreibung:</strong> {recipe.description || "Keine"}
      </p>

      <div className="flex gap-3 mt-4 flex-wrap">
        <button
          onClick={() => navigate("/recipes")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Zurück zur Übersicht
        </button>

        <button
          onClick={() => navigate(`/recipes/${recipe._id}/edit`)}
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
        >
          Bearbeiten
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Löschen
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
