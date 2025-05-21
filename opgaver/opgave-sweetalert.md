# Opgave: Bekræft sletning med SweetAlert2

## Formål

Du skal lære at bruge biblioteket [SweetAlert2](https://sweetalert2.github.io/)
til at vise en dialogboks, når brugeren fx forsøger at slette et produkt.
Brugeren skal bekræfte med "Ja" eller "Nej", før sletningen gennemføres.

---

## Hvad er SweetAlert2?

SweetAlert2 er et JavaScript-bibliotek, der viser flotte og brugervenlige popups
til f.eks. advarsler, succesbeskeder og bekræftelsesdialoger. Det kan bruges i
stedet for `window.confirm()` – og ser langt bedre ud.

Typiske funktioner:

- Bekræftelse ("Er du sikker?")
- Info- og fejlbeskeder
- Brugerinput (fx navn, e-mail)
- Automatisk lukning efter timer

---

## Installation

Installer SweetAlert2 i dit projekt:

```bash
npm install sweetalert2
```

Importér det i din komponent (ligesom med toastify):

```js
import Swal from "sweetalert2";
```

SweetAlert2 er globalt i den forstand, at du ikke skal placere en container i
din App – du kan bare importere det og bruge det hvor som helst i din
React-kode.

---

## Din opgave

Du har en liste af produkter. Hvert produkt har en "Slet"-knap.

1. Når brugeren klikker på "Slet", skal der vises en **confirm-dialog** med:
   - En titel: "Er du sikker?"
   - En tekst: "Du er ved at slette dette produkt."
   - To knapper: "Ja, slet" og "Annullér"
2. Hvis brugeren klikker "Ja, slet", skal produktet slettes.
3. Hvis brugeren klikker "Annullér", sker der ingenting.
4. Vis evt. en toast eller besked bagefter (valgfrit).

---

## Eksempel på kode

```js
const handleDelete = async (productId) => {
  try {
    const result = await Swal.fire({
      title: "Er du sikker?",
      text: "Du er ved at slette dette produkt.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ja, slet",
      cancelButtonText: "Annullér",
    });

    if (result.isConfirmed) {
      await deleteProduct(productId);

      await Swal.fire("Slettet!", "Produktet er blevet slettet.", "success");
    }
  } catch (error) {
    console.error("Der opstod en fejl ved sletning:", error);
    Swal.fire("Fejl!", "Noget gik galt under sletning.", "error");
  }
};
```

---

## Bonusopgave

Hvis du har tid, kan du prøve at ændre designet med fx:

- ikon-typer (`info`, `success`, `error`)
- timer (auto-close)
- visning af flere knapper eller input-felt

---
