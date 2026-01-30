// Recipe Model (MongoDB/Mongoose)

import mongoose from 'mongoose';

/**
 * @typedef {Object} Recipe
 * @property {string} title - Titel des Rezepts
 * @property {string} [description] - Beschreibungstext
 * @property {string[]} [categories] - Liste von Kategorien wie "Vegan", "Hauptspeise" usw.
 * @property {string[]} [ingredients] - Liste der Zutaten
 * @property {Date} createdAt - automatisch von Mongoose generiertes Erstellungsdatum
 * @property {Date} updatedAt - automatisch von Mongoose generiertes Änderungsdatum
 */

const recipeSchema = new mongoose.Schema(
  {
    /**
     * Titel des Rezepts.
     * Pflichtfeld, führende und nachfolgende Leerzeichen
     * werden automatisch entfernt.
     */
    title: {
      type: String,
      required: true,
      trim: true,
    },
    /**
     * Optionale Beschreibung des Rezepts.
     */
    description: String,
    /**
     * Kategorien, denen das Rezept zugeordnet ist
     * (z. B. "Vegan", "Schnell", "Dessert").
     */
    categories: [String],
    /**
     * Liste der Zutaten als einfache Textwerte.
     */
    ingredients: [String],
  },
  {
    /**
     * Fügt automatisch die Felder `createdAt` und `updatedAt` hinzu
     * und pflegt diese bei Änderungen.
     */
    timestamps: true, // createdAt / updatedAt automatisch generiert
  }
);
/**
 * Mongoose-Model für Rezepte.
 * Stellt die Schnittstelle zur MongoDB-Collection `recipes` dar
 * und ermöglicht CRUD-Operationen auf Rezept-Dokumenten.
 */
const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
