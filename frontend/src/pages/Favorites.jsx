import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import ErrorMessage from "../components/ErrorMessage";
import { createSelector } from "@reduxjs/toolkit";

/**
 * Memoized Selector: filtert die Favoriten basierend auf Ids und Suchtext
 * 
 * @param {object[]} items - Alle Rezepte aus Redux
 * @param {string[]} favorites - Array von Favoriten IDs
 * @param {string} filter - Filtertext
 * @returns {object[]}  Array der Rezepte, die favorisiert sind und dem Filter entsprechen
 */ 

const selectFilteredFavorites = createSelector(
  (state) => state.recipes.items || [],
  (state) => state.favorites.items || [],
  (state) => state.recipes.filter || "",
  (items, favorites, filter) => {
    const favoriteRecipes = items.filter((r) => favorites.includes(r._id));
    const search = filter.toLowerCase();

    return favoriteRecipes.filter(
      (recipe) => 
        recipe.title.toLowerCase().includes(search) ||
        recipe.description?.toLowerCase().includes(search) ||
        recipe.categories?.some((cat) => cat.toLowerCase().includes(search)) ||
        recipe.ingredients?.some((ing) => ing.toLowerCase().includes(search))
    );
  }
);

/**
 * Favoriten-Seite
 * 
 * Rendert alle Rezepte, die als Favorit markiert sind
 * und dem Suchfilter entsprechen
 */

const Favorites = () =>{

  const filter = useSelector((state) => state.recipes.filter);

  const status = useSelector((state) => state.recipes.status);

  const filteredFavorites = useSelector(selectFilteredFavorites);

  // Early Returns
  if (status === "loading" || status ==="idle")
    return <p>Lade Favoriten...</p>;
  if (status === "failed") return <ErrorMessage/>


  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-400 mb-6">
        Deine Favoriten
      </h2>

      {/*Prüfe ob Favoriten vorhanden sind*/}
      {filteredFavorites.length === 0 ? (
        <p className="text-gray-600">
          {filter
            ? "Keine Favoriten entsprechen deiner Suche."
            : "Du hast noch keine Favoriten gespeichert."}
        </p>
      ) : (
        
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {filteredFavorites.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;


