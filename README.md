# Rezepte-App

Eine Full-Stack-Anwendung mit React, Node/Express und MongoDB.
Rezepte können gespeichert, bearbeitet, gelöscht und als Favorit markiert werden.

## Hinweis zur Live-Demo

Das Backend läuft auf dem kostenlosen Render-Plan.

Beim ersten Aufruf kann das Laden der Daten einige Sekunden dauern, da sich der Server zunächst noch im Sleep-Modus befindet.

## Live Demo

https://rezepte-app-delta.vercel.app

## Backend API

https://rezepte-app-wpyo.onrender.com

## Screenshots

### Rezeptliste
![Rezeptliste](docs/screenshots/Rezeptliste.png)

### Favoritenliste
![Favoritenliste](docs/screenshots/Favoritenliste.png)

### Detailansicht
![Detailansicht](docs/screenshots/Detailansicht.png)

### Rezept hinzufügen
![Rezept-hinzufuegen](docs/screenshots/Rezept-hinzufuegen.png)

## Features
- Rezepte erstellen, bearbeiten, löschen
- Favoriten markieren
- Suche & Filter nach Titel, Beschreibung, Kategorien, Zutaten
- Fehleranzeigen bei Netzwerkproblemen oder fehlgeschlagenen Requests

## Tech-Stack

### Frontend
- React
- Redux Toolkit
- React Router 
- TailwindCSS
- Vite

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

## Projektstruktur
```
Rezepte-App/
│
├── backend/  
│   │
│   ├── server.js       # stellt CRUD-Endpunkte für Rezepte bereit
│   │                   # verbindet sich mit MongoDB (Mongoose)
│   └── models/
│       └── Recipe.js   # Mongoose Datenmodell
│                       # definiert Struktur eines Rezepts
└── frontend/
    │
    ├── index.html
    │
    └── src/
        │
        ├── App.jsx
        ├── main.jsx
        │
        ├── components/
        ├── layout/
        ├── pages/
        └── redux/
```
## Datenbank / MongoDB Atlas 

Dieses Projekt nutzt MongoDB Atlas als Cloud-Datenbank und ist bereits vollständig konfiguriert und deployed.

Für die Nutzung der Live-Version ist keine Datenbank-Konfiguration erforderlich.

## Mögliche Erweiterungen

Das Projekt ist vollständig funktionsfähig und bewusst modular aufgebaut, sodass es zukünftige leicht erweitert werden kann.


Mögliche Verbesserungen und Erweiterungen:
- Benutzer-Authentifizierung (Login)
- Rezeptbilder (Cloud-Speicherung)
- Bewertungssystem für Rezepte
- Mehrbenutzer-System (Rezepte teilen)


## Für Entwickler (lokale Ausführung)

Für die lokale Nutzung muss eine MongoDB Atlas Datenbank eingerichtet werden.

### In MongoDB Atlas:

1. Projekt erstellen

2. Cluster erstellen (z. B. free tier reicht).

3. Einen Datenbankbenutzer anlegen.

4. Das Passwort dieses Benutzers kopieren.

5. Die eigene MongoDB-URI in die .env Datei eintragen (basierend auf .env.example im Ordner "backend"):

### MongoDB-URI:

1. Die URI bekommen Sie direkt aus Atlas, sobald Sie ein Cluster erstellt haben:

2. Einloggen in MongoDB Atlas → Cluster auswählen.

3. Klicken Sie auf "Connect" beim gewünschten Cluster.

4. Wählen Sie „Connect your application“ oder „Driver" (nicht MongoDB Compass oder VS Code).

5. Dort sehen Sie die URI in etwa so:

    mongodb+srv://username:password@clustername.mongodb.net/dbname?retryWrites=true&w=majority&appName=yourapp

    `username` → der Name des Datenbankbenutzers, den Sie in Atlas angelegt haben

    `password` → das Passwort, das Sie dem Benutzer bei der Anlage gegeben haben

    `clustername` → der Name Ihres Clusters

    `dbname` → Name Ihrer Datenbank 

    `yourapp` → name Ihrer App


### Datenbank-Benutzer anlegen

SECURITY -> klicken Sie auf Database & Network Access  (links im Menü)

Klicken Sie auf Add New Database User

Wählen Sie einen Benutzernamen

Wählen Sie ein Passwort 

Klicken Sie auf Add User

Benutzername und Passwort merken – beides wird später für die URI benötigt.

### IP-Zugriff erlauben

Damit Ihre lokale App auf Atlas zugreifen kann:

Gehen Sie auf "Database & Network Access"

Gehen Sie zu "IP Access List" → Add IP Address

Option: 0.0.0.0/0 → erlaubt Zugriff von allen IPs 
oder die eigene aktuelle IP eingeben → Zugriff nur vom eigenen Rechner

## Installation und Start

### Vorraussetzungen

Node.js >= 18 empfohlen

### Projekt herunterladen:

git clone https://github.com/Rob2525252555/Rezepte-App.git

### Umgebungsvariablen Backend

Im Ordner "backend" die Datei ".env" erstellen basierend auf ".env.example":

MONGO_URI=your-mongodb-uri-here

PORT=5000

### Umgebungsvariablen Frontend

Im Ordner "frontend" die Datei ".env" erstellen basierend auf ".env.example":

VITE_API_URL=http://localhost:5000

### Dependencies installieren:

```
Backend:
cd backend
npm install

Frontend:
cd frontend
npm install
```
### Backend starten
```    
cd backend
node server.js

Der Backend-Server läuft auf http://localhost:5000
```
### Frontend starten
```
cd frontend
npm run dev

Frontend läuft standardmäßig auf http://localhost:5173
```

