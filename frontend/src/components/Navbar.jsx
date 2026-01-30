import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/recipesSlice";
import { useLocation } from "react-router-dom";

/**
 * Navbar-Komponente mit Suchfilter
 * 
 * - Zeigt ein Suchfeld für Rezepte an
 * - Filtert Rezepte über den Redux Store
 * - Der Filter wird automatisch zurück gesetzt,
 *  wenn sich die Route ändert
 * - Das Suchfeld ist nur auf bestimmten Seiten sichtbar
 */
const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  //Aktueller Filtertext aus dem Redux Store
  const filter = useSelector((state) => state.recipes.filter);

  //Setzt den Filter zurück falls sich die Route ändert
  useEffect(() => {
    dispatch(setFilter(""));
  }, [location.pathname, dispatch]);

  //Bestimmt, auf welchen Routen die Suchleiste angezeigt wird
  const showSearch =
    location.pathname === "/recipes" || location.pathname === "/favorites";

  return (
    <nav
      className={`
        bg-amber-400 px-6 py-4 shadow-md flex items-center justify-between transition-all duration-300 rounded-lg
        ${showSearch ? "opacity-100 visible h-auto" : "opacity-0 pointer-events-none select-none"}
      `}
    >
      <h1 className="text-xl font-bold cursor-pointer">Rezept suchen:</h1>
      {/*Suchfeld zur Aktualisierung des Filtertexts im Redux Store*/}
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          placeholder="Suchen nach Titel, Zutaten, Kategorien..."
          className="px-3 py-2 rounded-lg text-black w-64 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
    </nav>
  );
};

export default Navbar;
