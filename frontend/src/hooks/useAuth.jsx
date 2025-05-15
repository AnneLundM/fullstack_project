import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Gem bruger-oplysninger og token i localStorage
  const [user, setUser] = useLocalStorage("user", {});
  const [auth, setAuth] = useLocalStorage("auth", {});

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3042/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Vi sender JSON
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login fejlede.");
      }

      // Backenden tjekker om brugeren findes og om adgangskoden er korrekt. Hvis alt er ok, genererer den en token
      // En token (eller "nøgle") er en lille datastreng, som bruges til at identificere og autentificere en bruger
      // eller en enhed – især i forbindelse med login og adgangskontrol i webapplikationer og API'er. Man kan tænke på det som en digital adgangsbillet.
      const result = await response.json();
      const user = jwtDecode(result.data.token); // Decode token for at hente brugerens data
      setAuth({ token: result.data.token }); // Gem token i localStorage
      setUser(user); // Gem brugerdata i localStorage

      // Navigér til backoffice efter login
      navigate("/backoffice");
    } catch (err) {
      // Hvis der sker en fejl, vis en fejlmeddelelse
      setError(err.message || "Noget gik galt. Prøv igen.");
    }
  };

  // Funktion til at logge ud – rydder auth og brugerdata
  const signOut = () => {
    setAuth({});
    setUser({});
  };

  // Ekstra hjælpedata:
  const token = auth.token ? auth.token : ""; // Udtræk token (hvis den findes)
  const signedIn = !!auth.token; // Boolean: Er brugeren logget ind?

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    signIn,
    signOut,
    token,
    signedIn,
    user,
  };
};

export default useAuth;
