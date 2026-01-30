/**
 * Express Server Entry Point
 *
 * Stellt eine REST API für Rezepte bereit (auf Basis von Express und MongoDB (Mongoose))
 * Verwendung:
 * - Initialisierung des Express-Servers
 * - MongoDB-Verbindung
 * - Definition der Recipe-Endpunkte(CRUD)
 * - Server starten
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import Recipe from './models/Recipe.js';

// Lädt Umgebungsvariablen aus der .env-Datei in process.env 
dotenv.config(); 

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
//Parst automatisch JSON-Daten im Request-Body, damit req.body verfügbar ist
app.use(express.json());

/**
 * stellt die Verbindung zur Mongo-DB her.
 * Beim Serverstart wird die Verbindung initialisiert
 */
mongoose.connect(MONGO_URI)
  .then(() => console.log('Mit MongoDB (Mongoose) verbunden'))
  .catch((err) => console.error('Fehler bei der MongoDB-Verbindung:', err));

/**
 * Alle Rezepte abrufen
 */
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
  }
});

/**
 * Einzelnes Rezept abrufen (nach _id)
 */
app.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ error: 'Rezept nicht gefunden' });

    res.json(recipe);
  } catch (error) {
    console.error('Fehler beim Abrufen des Rezepts:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen des Rezepts' });
  }
});

/**
 * Neues Rezept hinzufügen
 */
app.post('/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * Rezept aktualisieren (Bearbeiten)
 */
app.put('/recipes/:id', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      // gibt das aktualisierte Dokument zurück, prüft das Schema
      { new: true, runValidators: true } 
    );
    // überprüft, ob die Id in der Datenbank existiert
    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Rezept nicht gefunden' });
    }

    res.json(updatedRecipe);
  } catch (error) {
    console.error('Fehler beim Aktualisieren:', error);
    res.status(400).json({ error: error.message });
  }
});
/**
 * Rezept löschen, Rezept wird anhand der Id gefunden
 */
app.delete('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Recipe.findByIdAndDelete(id);

    // überprüft, ob die Id in der Datenbank existiert
    if (!deleted) {
      return res.status(404).json({ error: 'Rezept nicht gefunden' });
    }

    res.json({ message: 'Rezept erfolgreich gelöscht' });
  } catch (error) {
    console.error('Fehler beim Löschen:', error);
    res.status(500).json({ error: 'Fehler beim Löschen des Rezepts' });
  }
});



// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
