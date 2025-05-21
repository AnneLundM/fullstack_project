# Opgave: Forstå og brug React Context

## Formål

I denne opgave skal du lære, hvad React Context er, hvorfor det er nyttigt – og
du skal selv implementere en `AuthContext`, så hele din app nemt kan få adgang
til login-status og brugerdata.

---

## Hvad er React Context?

React Context er en funktion i React, der giver dig mulighed for at dele data på
tværs af komponenter **uden at skulle sende props manuelt hele vejen gennem
komponenttræet**.

Forestil dig, at du vil dele information om den aktuelle bruger (fx navn, email
og om man er logget ind). Hvis du sender det som props fra `App.jsx` til
`Header.jsx` til `UserInfo.jsx` osv., bliver din kode hurtigt rodet.

Også selvom du måske kan tilgå bruger- og login-informationerne direkte i
komponenten fra localstorage, er der fler eulemper ved denne metode:

| Problem                             | Hvorfor det er et problem                                                        |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| ❌ Ikke reaktivt                    | Hvis du ændrer `localStorage`, bliver komponenter **ikke opdateret** automatisk. |
| ❌ Gentaget kode                    | Du skal gentage `JSON.parse(localStorage.getItem(...))` mange steder.            |
| ❌ Dårlig testbarhed                | Det er sværere at skrive tests, når komponenten selv henter data direkte.        |
| ❌ Manglende separation of concerns | Komponenter ved nu "hvordan" data hentes – ikke kun hvad de skal vise.           |

### Med Context kan du:

- Dele data ét sted fra (fx brugerdata, tema eller sprog)
- Tilgå det fra hvilken som helst komponent – uden "prop drilling"
- Gøre din kode mere overskuelig og genanvendelig

---

## Din opgave

Du skal nu implementere en `AuthContext`, som gør det muligt at tilgå
`useAuth()` globalt i din app.

---

## Sådan gør du

### 1. Opret en ny fil:

Opret mappen `/context` og lav filen:  
`AuthContext.jsx` deri.

Indsæt følgende kode:

```jsx
import { createContext, useContext } from "react";
/* Importér din hook */
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
```

Importér den i din main.jsx

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

/* Hent user og andre login informationer direkte fra din context */

const { user, isSignedIn } = useAuthContext();
```
