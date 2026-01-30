const Home = () => {
  return (
    <div className="max-w-3xl mx-auto text-center p-8 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-amver-300 mb-4">
        Willkommen bei deiner Rezept App! 
      </h1>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        Speichere deine Lieblingsrezepte!  
        Egal ob du ein schnelles Abendessen, einen süßen Snack oder ein aufwendiges Menü suchst,
        hier kannst du Gerichte für jeden Anlass speichern!
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        Erstelle eigene Rezepte, bearbeite sie jederzeit und markiere deine Favoriten , 
        damit du sie nie wieder vergisst.  
        Dank der übersichtlichen Suche findest du ganz einfach Rezepte nach <strong>Titel, </strong> 
        <strong>Zutaten</strong> oder <strong>Kategorien</strong>.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed">
        Also worauf wartest du?  
        Starte jetzt 
        und bring frische Ideen in deine Küche!
      </p>

      <div className="mt-8">
        <a
          href="/recipes"
          className="inline-block bg-amber-300 text-white px-6 py-3 rounded-lg hover:bg-amber-400 transition"
        >
          Zu den Rezepten
        </a>
      </div>
    </div>
  );
};

export default Home;
