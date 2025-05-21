# Fullstack code-along-project (Backend + frontend)

**OBS:** Kopiér ikke noget herfra, men find inspiration i forhold til logik samt
kode- og mappestruktur!

De medfølgende opgaver i roden af dette projekt, er gode øvelser i forhold til
at lære om og forstå flere af de biblioteker, der bliver brugt heri.

Løs opgaverne og skriv kommentarer til den kode du vælger at bruge herfra.
**AL** kode skal kunne forklares.

**Vis en md-fil ved at højreklikke på den og klikke 'Open Preview'**

---

## Vejledning til opstart af projektet

Dette projekt køres på følgende måde:

1. I en ny terminal åbnes frontend mappen ved at skrive følgende:

   ## cd frontend

   ## npm i

   ## npm run dev

2. Tilføj en .env.local fil i roden af backend-mappen og indsæt følgende deri:

   ```
   # Secret Variables for use in Server Application.

   NODE_ENV=development

   SERVER_PORT=3042
   SERVER_HOST=http://localhost:3042

   MONGODB_URI=mongodb://127.0.0.1:27017/mcd-express-server

   # JWT

   JWT_EXPIRES_IN="24h"
   JWT_SECRET="8e18fa26acc704d3ca37fea29e17e8e024423a7c3eab4b76390a94ac579c20f0"

   # Flags

   USE_JWT=true
   ```

3. I endnu en ny terminal åbnes backend mappen ved at skrive følgende:

   ## cd backend

   ## npm i

   ## node server.js

4. Åbn MongoDB Compass og tjek at databasen er oprettet
5. Import en ny collection i Postman (indsæt filen fra /backend/postman)
6. Test alle endpoints

---

## OBS

Vær opmærksom på USE_JWT variablen i .env.local filen. Er den true er det kun
brugere der er logget ind, der kan post/put/delete. Sæt den til false indtil du
har oprettet en admin-bruger.
