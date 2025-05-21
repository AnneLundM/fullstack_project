// Importér mongoose og Schema-klassen fra mongoose-pakken
// Mongoose er en hjælper der sørger for, at dine data i MongoDB har den rigtige struktur, bliver valideret og er nemme at arbejde med.
import mongoose, { Schema } from "mongoose";

// Sørger for, at validering bliver udført automatisk, når vi gemmer dokumenter i databasen
mongoose.set("runValidators", true);

// Definérer et schema for produkter (hvordan dataen skal se ud i databasen)
const productSchema = new Schema(
  {
    // title er et krævet felt (required), og det skal være en tekststreng
    title: { type: String, required: true },

    // description er valgfri og skal være en tekststreng
    description: { type: String },

    // price er valgfri og skal være et tal
    price: { type: Number },

    // image er en tekststreng (typisk en URL eller filsti)
    // Hvis intet billede gives, sættes der en default-billede-URL (hentet fra en miljøvariabel)
    image: {
      type: String,
      default: process.env.SERVER_HOST + "/uploads/products/no-image.jpg",
    },

    // category er valgfri og skal være en tekststreng
    category: { type: String },
  },

  // Schema-indstillinger: timestamps gør, at MongoDB automatisk tilføjer `createdAt` og `updatedAt`
  { timestamps: true }
);

// Eksportér modellen: Hvis modellen allerede er oprettet, genbruges den
// Dette forhindrer fejl, når serveren genstarter eller i udvikling (f.eks. med Next.js)
export default mongoose.models.product ||
  mongoose.model("product", productSchema);
