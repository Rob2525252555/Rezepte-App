import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes } from "../redux/recipesSlice";
import RecipeCard from "../components/RecipeCard";
import ErrorMessage from "../components/ErrorMessage";

/**
 * RecipeList Page
 * 
 * - Zeigt eine Liste aller Rezepte als Karte an
 * - Unterstützt Filterung nach Titel, Beschreibung, Kategorien und Zutaten
 * - Verwendet den Status aus Redux, um Early Returns für Loading, Fehler oder
 *   Leere Listen anzuzeigen
 */

const RecipeList = () => {
  const dispatch = useDispatch();
  const { items, status, filter } = useSelector((state) => state.recipes);

  // Rezepte beim ersten Laden der Seite aus dem Backend holen,
  // wenn der Status auf idle ist (noch nicht geladen)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

  //---------------------------
  // Early Returns basierend auf Status
  //---------------------------

  // Ladeindikatoren anzeigen, während die Daten geholt werden
  if (status === "loading") return <p>Lade Rezepte...</p>;

  //  Fehleranzeige, falls der Fetch fehlgeschlagen ist
  if (status === "failed") return <ErrorMessage />;

  // Wenn Fetch erflogreich, aber keine Rezepte vorhanden
  if (status === "succeeded" && items.length === 0)
    return <p>Keine Rezepte gefunden.</p>;

  //---------------------------
  // Filter-Logik: nur Rezepte anzeigen, die mit dem Filter übereinstimmen
  //---------------------------

  const filteredItems = items.filter((recipe) => {
    const search = filter.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(search) ||
      recipe.description?.toLowerCase().includes(search) ||
      recipe.categories?.some((cat) => cat.toLowerCase().includes(search)) ||
      recipe.ingredients?.some((ing) => ing.toLowerCase().includes(search))
    );
  });

  //-----------------------------
  // Rendern der gefilterten Rezept-Karten
  //-----------------------------
  
  return (
    <div>
      {/* Überschrift */}
      <h2 className="text-2xl font-bold mb-6 text-amber-400">Alle Rezepte</h2>

      {/* Grid für Rezeptkarten */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
        {filteredItems.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
