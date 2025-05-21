# Opgave: Validering af kontaktformular med Yup

## Formål

Du skal lære at bruge **Yup** sammen med **react-hook-form** til at validere
formularfelter i en kontaktformular. Når du har gennemført opgaven, vil du kunne
definere og bruge valideringsregler på en professionel og skalerbar måde.

---

## Introduktion til Yup

**Yup** er et JavaScript-bibliotek til deklarativ **validering af objekter og
formularfelter**. Det bruges ofte sammen med formularbiblioteker som
`react-hook-form`.

Et simpelt valideringsskema med Yup kunne se sådan ud:

```js
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Ugyldig email").required("Email er påkrævet"),
  name: yup.string().required("Navn er påkrævet"),
});
```

Dette skema siger:

- `email` skal være en gyldig e-mail og skal være udfyldt
- `name` skal være udfyldt

For at bruge dette skema i `react-hook-form`, skal du bruge `yupResolver`, som
oversætter Yup-reglerne til noget `react-hook-form` kan forstå.

---

## Din opgave

### Udgangspunkt

Brug kontaktformularen fra Gittes Glamping, der **ikke bruger validering** eller
kun bruger simple `{ required: true }`. Formularen består af følgende felter:

- Navn (`name`)
- Email (`email`)
- Emne (`subject`)
- Besked (`message`)

1. **Installer Yup og resolveren:**

   ```bash
   npm install yup @hookform/resolvers
   ```

2. **Opret et valideringsskema med Yup** med følgende regler:

   - `name` er påkrævet
   - `email` skal være gyldig og påkrævet
   - `subject` er påkrævet
   - `message` er påkrævet og skal være mindst 10 tegn

3. **Knyt skemaet til `react-hook-form`** med `yupResolver`.

4. **Vis fejlbeskeder under hvert felt**.

5. Når formularen validerer korrekt og bliver sendt, vis en besked i bunden:  
   `Tak for din besked, [navn]!`

---

## Bonus (hvis du bliver hurtigt færdig)

- Brug `setTimeout` til at fjerne beskeden efter 5 sekunder.
- Tilføj betinget styling: grøn tekst ved succes, rød ved fejl.

---
