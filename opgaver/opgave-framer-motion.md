# Opgave: Lav en genanvendelig animations-wrapper med Framer Motion

Framer Motion er et animationsbibliotek til React, som gør det nemt at tilføje
glatte og avancerede animationer til dine komponenter.

- Det er brugervenligt
- Det er kraftfuldt – understøtter overgange, keyframes, gestus (drag, hover) og
  layout-animationer.
- Det er integreret med React – animationer kan reagere på state, props og
  betinget rendering.

Kort sagt: Framer Motion gør det nemt at få dine React-komponenter til at bevæge
sig lækkert og responsivt.

## 1: Installer Framer Motion

```bash
npm install framer-motion
```

---

## 2: Lav `FadeWrapper.jsx`

```jsx
import { motion, AnimatePresence } from "framer-motion";

const FadeWrapper = ({ children, keyName }) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={keyName}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeWrapper;
```

---

## 3: Brug wrapperen i en komponent

Lav en side hvor man skifter mellem to visninger – fx:

```jsx
import { useState } from "react";
import FadeWrapper from "./components/FadeWrapper";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Vis produkt" : "Vis formular"}
      </button>

      <FadeWrapper keyName={showForm ? "form" : "card"}>
        {showForm ? (
          <div>
            <h2>Formular</h2>
            <input placeholder='Skriv noget...' />
          </div>
        ) : (
          <div>
            <h2>Produkt</h2>
            <p>Her kunne stå info om et produkt.</p>
          </div>
        )}
      </FadeWrapper>
    </div>
  );
}

export default App;
```

---

## (Valgfrit)

- Gør `FadeWrapper` fleksibel så man kan vælge fx `fade`, `slide` eller `zoom`
  via prop.
- Tilføj en animation til knappen, fx når man klikker.
- Brug `motion.button` i stedet for almindelig `<button>`.

---

## Tips

Du kan også bruge Framer Motion til at animere:

- Ruteovergange (med React Router)
- Lister (med `layout` animationer)
- Overlays og modaler
