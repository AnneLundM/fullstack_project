# Opgave: Vis feedback med Toastify i din React-app

## Mål

Du skal lære at bruge Toastify til at vise beskeder i din React-applikation, så
brugeren får visuel feedback, når noget lykkes eller fejler. Du skal også
placere Toastify globalt, så det virker fra alle komponenter.

---

## Trin 1: Hvad er Toastify?

Toastify er et lille bibliotek, der gør det let at vise "toasts" – små beskeder
øverst på skærmen. Det bruges typisk til:

- Bekræftelser (fx "Din besked er sendt")
- Fejl (fx "Der opstod en fejl")
- Information (fx "Du er nu logget ind")

---

## Trin 2: Installation

Installer Toastify i din React-app:

```bash
npm install react-toastify
```

---

## Trin 3: Global opsætning

Tilføj `ToastContainer` globalt i din `App.jsx`:

```jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='app'>
      <div className='main'>{routes}</div>
      <ToastContainer position='bottom-right' autoClose={2000} />
    </div>
  );
}
```

---

## Trin 4: Brug Toastify i en komponent

Gå ind i en komponent hvor der sker en handling (fx formular-submit), og brug
`toast.success()` eller `toast.error()`:

```jsx
import { toast } from "react-toastify";

const onSubmit = () => {
  toast.success("Produktet blev oprettet!");
  toast.error("Noget gik galt!");
};
```

---

## Trin 5: Din opgave

1. Installer og konfigurer Toastify som beskrevet ovenfor.
2. Lav en knap eller formular, der viser en toast-besked ved klik/submit.
3. Test med både en succes- og fejlbesked.

Ekstra:

- Tilpas placering, varighed og styling i `ToastContainer`
- Undersøg hvordan man laver egne toast-komponenter med ikoner eller JSX

---

## Spørgsmål til refleksion

- Hvad er fordelen ved at placere `ToastContainer` globalt?
- Hvorfor er det vigtigt at vise feedback til brugeren?

---

## Bonus: Tilpasningseksempel

```jsx
toast("Custom besked", {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
```
