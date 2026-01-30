// Redux Toolkit Import

import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Lädt alle Rezepte vom Backend
 * 
 * Führt eine GET-Request auf die Recipe-API aus
 * und speichert das Ergebnis im Redux Store
 * 
 * @returns {Promise<Recipe[]>} Liste aller Rezepte
 */
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await axios.get('http://localhost:5000/recipes');
    return response.data;
  }
);

/**
 * Erstellt ein neues Rezept
 * 
 * Sendet die Rezeptdaten an das Backend und 
 * fügt es zum Store hinzu
 * 
 * @param {Recipe} newRecipe - Rezeptdaten
 * @returns {Promise<Recipe>} Erstelltes Rezept
 */
export const addRecipe = createAsyncThunk(
  'recipes/addRecipe',
  async (newRecipe) => {
    const response = await axios.post('http://localhost:5000/recipes', newRecipe);
    return response.data;
  }
);

/**
 * Aktualisiert ein vorhandenes Rezept
 * 
 * Sendet die ID und die Daten, die sich ändern sollen
 * an das Backend
 * 
 * @param {Object} payload
 * @param {string} payload.id - ID des zu aktualisierenden Rezepts
 * @param {Partial<Recipe>} payload.updatedData - Zu ändernde Felder
 * @returns {Promise<Recipe>} Aktualisiertes Rezept
 */
export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async ({ id, updatedData }) => {
    const response = await axios.put(`http://localhost:5000/recipes/${id}`, updatedData);
    return response.data;
  }
);

/**
 * Löscht ein Rezept anhand der ID
 * 
 * Nach erfolgreichem löschen wird die ID zurück gegeben,
 * um das Rezept auch im Redux-Store zu entfernen
 * 
 * @param {string} id - Die ID des zu löschenden Rezeptes
 * @returns {Promise<string>} ID des gelöschten Rezepts
 */
export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async (id) => {
    await axios.delete(`http://localhost:5000/recipes/${id}`);
    return id;
  }
);

/**
 * Ermöglicht das neu laden einer Seite und der Rezepte
 * 
 * Wird zu Beispiel für die Error-Page verwendet
 * Delegiert intern an den `fetchRecipes`-Thunk
 */
export const retryFetch = createAsyncThunk(
  'recipes/retryFetch',
  async (_, { dispatch }) => {
    await dispatch(fetchRecipes());
  }
);

/**
 * Redux Slice zur Verwaltung des Recipe-States.
 */
const recipesSlice = createSlice({
  name: 'recipes',

  initialState: {   // Initialer Zustand des recipe-Slices:
    items: [],      // geladene Rezepte
    status: 'idle', // idle | loading | succeeded | failed
    error: null,    // Fehlermeldung
    filter: '',     // Filtertext für die Anzeige
  },
  reducers: {
    // setzt den Filtertext für die Suche), Filtertext = action.payload
    setFilter: (state, action) => {
      state.filter = action.payload.toLowerCase();
    },
    
    // setzt Fehler zurück und Status auf 'idle'
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      //  Speichert alle geladenen Rezepte im redux Store nach erfolgreichem fetchRecipes-Aufruf
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Fügt ein neu erstelltes Rezept, das vom Backend zurückkommt, zum Store hinzu 
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Aktualisiert ein vorhandenes Rezept anhand der ID mit den Backend-Daten
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((r) => r._id === updated._id);
        if (index !== -1) state.items[index] = updated;
      })
      // Entfernt ein Rezept aus dem Store, nachdem es im Backend gelöscht wurde
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r._id !== action.payload);
      })

      // Automatisches Status- & Fehlerhandling für alle Thunks
      // Loading Status setzen und Fehler zurücksetzen, wenn ein Thunk pending ist
      .addMatcher(
        isPending(fetchRecipes, addRecipe, updateRecipe, deleteRecipe),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      // Success Status setzen, Fehler löschen, wenn ein Thunk fulfilled ist
      .addMatcher(
        isFulfilled(fetchRecipes, addRecipe, updateRecipe, deleteRecipe),
        (state) => {
          state.status = 'succeeded';
          state.error = null;
        }
      )
      // Failed Status setzen, Fehlermeldung speichern, wenn ein Thunk rejected ist
      .addMatcher(
        isRejected(fetchRecipes, addRecipe, updateRecipe, deleteRecipe),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message === 'Network Error'
            ? 'Network Error'
            : action.error.message || 'Unbekannter Fehler';
        }
      );
  },
});

// Exportiert die Action Creator, zum dispatchen in der App
export const { setFilter, clearError } = recipesSlice.actions;
// Exportiert Reducer für den Store, um State zu verwalten
export default recipesSlice.reducer;
