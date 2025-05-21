# Opgave: Brug loading spinners med `react-spinners`

## Formål

I denne opgave skal du lære at bruge loading-animationer i dine
React-komponenter, så brugeren får visuel feedback, mens data hentes eller
gemmes.

---

## Hvorfor bruge loading spinners?

Når brugeren klikker på en knap, sender en formular eller loader en side, kan
der gå et øjeblik før data er klar. Hvis der **ikke** vises nogen indikator,
virker siden måske som om den er frosset – og det giver dårlig brugeroplevelse.

Med en loading-spinner viser du:

- at der sker noget i baggrunden
- at brugeren ikke skal klikke igen
- at din app er velfungerende og venlig

---

## Hvornår bør du bruge det?

Brug loading spinners når:

- data hentes fra en server (fx `fetch` eller `axios`)
- en formular bliver sendt
- du uploader filer
- du venter på login eller autorisation
- noget skal vises **efter** en handling er afsluttet

---

## Dette eksempel tager udgangspunkt i `react-spinners` som du kan finde mere info om her:

Du kan læse om biblioteket her:  
https://www.npmjs.com/package/react-spinners

Dokumentation og alle spinnertyper findes her:  
https://www.davidhu.io/react-spinners/

---

## Installation

Installer pakken i dit projekt:

```bash
npm install react-spinners
```

Importér en loader i din komponent:

```js
import { ClipLoader } from "react-spinners";
```

---

## Din opgave

Du skal implementere en spinner på alle de relevante steder, i et eksisterende
projekt.

---

## Eksempel på brug

```js
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const DataLoader = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      {loading && <ClipLoader color='#36d7b7' loading={loading} size={40} />}
    </div>
  );
};
```

---

## Bonusopgave

- Prøv mindst 3 forskellige spinnertyper (fx `BarLoader`, `PacmanLoader`,
  `BeatLoader`)
- Lav en dropdown hvor brugeren kan vælge hvilken spinner der skal vises

---

## God fornøjelse med at gøre jeres brugeroplevelse bedre!

## Alternativer til `react-spinners`

`react-spinners` er kun ét af mange gode biblioteker til loading-animationer.
Her er nogle andre populære:

- [`react-loader-spinner`](https://www.npmjs.com/package/react-loader-spinner) –
  mange forskellige typer spinners og bars
- [`react-loading`](https://www.npmjs.com/package/react-loading) – simpelt og
  nemt med f.eks. bars og bubbles
- [`loaders.css-react`](https://www.npmjs.com/package/loaders.css-react) –
  CSS-baserede spinners til React
- [`spinners-react`](https://www.npmjs.com/package/spinners-react) – moderne,
  skalerbare spinners
