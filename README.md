# Rezepte-App

## Beschreibung
Eine React-App mit Node/Express Backend und MongoDB,
um Rezepte zu speichern, zu bearbeiten und Favoriten zu markieren.

## Technologien
**Frontend**: React, Redux Toolkit, React Router, TailwindCSS, Vite

**Backend**: Node.js, Express, MongoDB, Mongoose

## Features
- Rezepte erstellen, bearbeiten, löschen
- Favoriten markieren
- Suche & Filter nach Titel, Beschreibung, Kategorien, Zutaten
- Fehleranzeigen bei Netzwerkproblemen oder fehlgeschlagenen Requests

## Hinweise
- `.env` ist nicht im Repo enthalten
- Node.js >= 18 empfohlen

## Datenbank / MongoDB Atlas Hinweis
*(Dieser Schritt kann übersprungen werden, falls bereits eine MongoDB-URI vorhanden ist. Bei Installation fortfahren!)* 
- Damit die App funktioniert, muss jeder Nutzer einen eigenen MongoDB Atlas Account erstellen.
- In MongoDB Atlas:

        1. Projekt erstellen

        2. Cluster erstellen (z. B. free tier reicht).

        3. Einen Datenbankbenutzer anlegen.

        4. Das Passwort dieses Benutzers kopieren.

        5. Die eigene MongoDB-URI in die .env Datei eintragen (basierend auf .env.example):

- MongoDB-URI:

        1. Die URI bekommen Sie direkt aus Atlas, sobald Sie ein Cluster erstellt haben:

        2. Einloggen in MongoDB Atlas → Cluster auswählen.

        3. Klicken Sie auf "Connect" beim gewünschten Cluster.

        4. Wählen Sie „Connect your application“ (nicht MongoDB Compass oder VS Code).

        5. Dort sehen Sie die URI in etwa so:

        mongodb+srv://username:password@clustername.mongodb.net/dbname?retryWrites=true&w=majority&appName=yourapp

        `username` → der Name des Datenbankbenutzers, den Sie in Atlas angelegt haben

        `password` → das Passwort, das Sie dem Benutzer bei der Anlage gegeben haben

        `clustername` → der Name Ihres Clusters

        `dbname` → Name Ihrer Datenbank 

        `yourapp` → name Ihrer App


- Datenbank-Benutzer anlegen

        SECURITY -> klicken Sie auf Database & Network Access  (links im Menü)

        Klicken Sie auf Add New Database User

        Wählen Sie einen Benutzernamen

        Wählen Sie ein Passwort 

        Klicken Sie auf Add User

        Benutzername und Passwort merken – beides wird später für die URI benötigt.

- IP-Zugriff erlauben

        Damit Ihre lokale App auf Atlas zugreifen kann:

        Gehen Sie auf "Database & Network Access"

        Gehen Sie zu "IP Access List" → Add IP Address

        Option: 0.0.0.0/0 → erlaubt Zugriff von allen IPs 
        oder die eigene aktuelle IP eingeben → Zugriff nur vom eigenen Rechner

## Installation
    Repository klonen:
    git clone git@github.com:Rob2525252555/Rezepte-App.git

    Dependencies installieren:

    Backend:
    cd Rezepte-App
    cd backend
    npm install

    Frontend:
    cd Rezepte-App
    cd frontend
    npm install
   
    Im backend Ordner ".env" erstellen basierend auf ".env.example"

## Backend starten
    cd backend
    node server.js
    Der Backend-Server läuft auf http://localhost:5000

## Frontend starten
    cd frontend
    npm run dev
    Frontend läuft standardmäßig auf http://localhost:5173


