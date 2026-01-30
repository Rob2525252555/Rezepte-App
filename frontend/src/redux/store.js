// Redux Toolkit Import
// configureStore dient zum Erstellen des Redux Stores und konfiguriert
// Standard-Middleware sowie die Redux DevTools automatisch
import { configureStore } from '@reduxjs/toolkit';

// Reducer-Imports aus den jeweiligen Slices
// Jeder Reducer verwaltet einen separaten Teil des globalen States
import recipesReducer from './recipesSlice';
import favoritesReducer from './favoritesSlice';

/**
 * Redux Store
 *
 * Zentraler Zustand (State) der Anwendung.
 *
 * State-Struktur:
 * - recipes: verwaltet Rezeptdaten (fetch, add, update, delete),
 * - favorites: verwaltet Favoriten (add/remove),
 *   
 * configureStore:
 * - kombiniert die einzelnen Slice-Reducer
 */
export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    favorites: favoritesReducer,
  },
});



