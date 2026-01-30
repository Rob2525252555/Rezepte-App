import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../redux/recipesSlice";
import Navbar from "../components/Navbar";

/**
 * Layout-Komponente
 *
 * Grundstruktur der App mit:
 * - Header mit Navbar und Navigation
 * - Main Content Bereich für gerenderte Routen (via <Outlet />)
 * - Footer
 *
 * Lädt beim ersten Mounten die Rezepte aus dem Backend in den Redux Store.
 */

const Layout = () => {
  const dispatch = useDispatch();

  // Beim ersten Laden der Seite Rezepte aus dem Backend laden

  useEffect(() => {
    dispatch(fetchRecipes()); 
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50/50">
     
      <header className="bg-amber-300 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          
          <Navbar/>
          <h1 className="text-2xl font-bold">Rezepte App</h1>
          <nav className="flex space-x-4">
            <Link
              to="/"
              className="inline-block bg-white text-amber-500 font-semibold px-4 py-2 rounded-lg shadow hover:bg-amber-100 transition"
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className="inline-block bg-white text-amber-500 font-semibold px-4 py-2 rounded-lg shadow hover:bg-amber-100 transition"
            >
              Rezepte
            </Link>
            <Link
              to="/add"
              className="inline-block bg-white text-amber-500 font-semibold px-4 py-2 rounded-lg shadow hover:bg-amber-100 transition"
            >
              Rezept hinzufügen
            </Link>
            <Link
              to="/favorites"
              className="inline-block bg-white text-amber-500 font-semibold px-4 py-2 rounded-lg shadow hover:bg-amber-100 transition"
            >
              Favoriten
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Bereich: Hier werden die gerenderten Routen angezeigt*/}
      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        © {new Date().getFullYear()} Recipe App
      </footer>
    </div>
  );
};

export default Layout;


