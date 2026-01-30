// Redux toolkit import
import { createSlice } from "@reduxjs/toolkit";
import { deleteRecipe } from "./recipesSlice"; 

const LOCAL_STORAGE_KEY = "favoritesRecipeApp";

// Prüft, ob eine ID eine gültige MongoDB ObjectID ist.
const isValidMongoId = (id) => /^[a-f\d]{24}$/i.test(id);

/**
 * Lädt die Favoriten IDs aus Local Storage.
 * Filtert ungültige IDs heraus und speichert ggf. bereinigte Liste zurück.
 * @returns {string[]} - Array von gültigen Favoriten-IDs
 */
const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    // Nur gültige MongoDB IDs behalten
    const validIds = Array.isArray(parsed)
      ? parsed.filter((id) => isValidMongoId(id))
      : [];

    // Falls sich etwas geändert hat, bereinigte Liste zurückschreiben
    if (validIds.length !== parsed.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(validIds));
    }

    return validIds;
  } catch {
    return [];
  }
};

/**
 * Speichert Favoriten IDs in Local Storage
 * 
 * @param {string[]} items - Array von Favoriten IDs
 */
const saveToLocalStorage = (items) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch {}
};

/**
 * Redux Slice zur Verwaltung der Favoriten
 */
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFromLocalStorage(), // Initiale Favoriten aus Local Storage
  },
  reducers: {
    /**
     * Toggle Funktion für Favoriten
     * 
     * @param {Object} state - Slice State
     * @param {Object} action - Redux Action
     * @param {string} action.payload - ID des Rezepts
     */
    toggleFavorite: (state, action) => {
      const id = action.payload;

      // nur gültige MongoDB IDs erlauben
      if (!isValidMongoId(id)) {
        console.warn("Ungültige ID für Favoriten:", id);
        return;
      }

      // Favorit hinzufügen oder entfernen
      if (state.items.includes(id)) {
        state.items = state.items.filter((fav) => fav !== id);
      } else {
        state.items.push(id);
      }
      // Jede Änderung im Local Storage speichern
      saveToLocalStorage(state.items);
    },
  },
  extraReducers: (builder) => {
     // Entfernt ein Rezept aus den Favoriten, wenn es im Backend gelöscht wurde
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      const deletedId = action.payload;
      state.items = state.items.filter((fav) => fav !== deletedId);
      saveToLocalStorage(state.items);
    });
  },
});

// Action Creator zum dispatchen in React-Komponenten
export const { toggleFavorite } = favoritesSlice.actions;
// Reducer Funktion für den Store
export default favoritesSlice.reducer;
