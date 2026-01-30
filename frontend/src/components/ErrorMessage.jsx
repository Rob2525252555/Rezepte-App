import { useSelector, useDispatch } from "react-redux";
import { retryFetch } from "../redux/recipesSlice";

/**
 * ErrorMessage-Komponente
 * 
 * Verhalten:
 * - Zeigt eine übergebene Fehlermeldung oder
 *   alternativ den Fehler aus dem Redux-Store an
 * - Unterstützt optionales Retry-Verhalten über Props
 *   oder Fallback auf den Standard-Retry aus dem Redux Store
 * 
 * @param {Object} props
 * @param {string} [props.title]   - Optionaler Titel (überschreibt Standardtitel)
 * @param {string} [props.message] - Optionale Fehlermeldung (überschreibt Redux-Fehler)
 * @param {Function} [props.onRetry] - Optionale Retry-Logik (überschreibt Redux-Retry)
 */
const ErrorMessage = ({ 
  title,       
  message,      
  onRetry       
}) => {
  const dispatch = useDispatch();

  // Status und Error aus Redux Store holen
  const { status, error } = useSelector((state) => state.recipes);

  // Titel für die Anzeige bestimmen
  const displayTitle = title || "Ein Fehler ist aufgetreten";

  // Fehlermeldung priorisieren:
  // 1. Prop
  // 2. Spezifische Network-Error-Meldung
  // 3. Fehler aus dem Store
  // 4. Fallback-Text
  
  const displayMessage =
    message ||
    (error === "Network Error"
      ? "Die Verbindung zur Datenbank konnte nicht hergestellt werden. Überprüfe deine Internetverbindung oder den Serverstatus."
      : error || "Etwas ist schiefgelaufen. Bitte versuche es später erneut.");

  // Führt benutzerdefinierte Retry-Funktion aus,
  // ansonsten Standard-Retry-Thunk aus dem Redux Store
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      dispatch(retryFetch());
    }
  };

  // Komponente nur rendern, wenn Fehlerzustand vorliegt
  if (status !== "failed") return null;

  return (
    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
      <p className="text-red-600 text-lg font-semibold mb-2"> {displayTitle}</p>
      <p className="text-gray-600 mb-4">{displayMessage}</p>

      {/* Retry-Button */}
      <button
        onClick={handleRetry}
        className="bg-amber-400 text-white px-4 py-2 rounded-lg hover:bg-amber-500 transition"
      >
        Erneut versuchen
      </button>
    </div>
  );
};

export default ErrorMessage;

