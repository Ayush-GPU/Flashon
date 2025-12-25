import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import Study from "./pages/Study";
import Pricing from "./components/Pricing";
import { getDeck } from "./api";

export default function App() {
  const [auth, setAuth] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [page, setPage] = useState("login");

  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const premium = localStorage.getItem("is_premium");

    if (token) {
      setAuth(true);
      setIsPremium(premium === "true");
      setPage("upload");
    }
  }, []);

  useEffect(() => {
    if (deckId) {
      getDeck(deckId).then(setCards);
    }
  }, [deckId]);

  const logout = () => {
    localStorage.clear();
    setAuth(false);
    setIsPremium(false);
    setPage("login");
  };

  return (
    <Layout
      isAuthenticated={auth}
      isPremium={isPremium}
      onLogout={logout}
    >
      {/* NOT LOGGED IN */}
      {!auth && page === "login" && (
        <Login
          onSuccess={(premium) => {
            setAuth(true);
            setIsPremium(premium);
            localStorage.setItem("is_premium", premium);
            setPage("upload");
          }}
          onSwitch={() => setPage("signup")}
        />
      )}

      {!auth && page === "signup" && (
        <Signup onSwitch={() => setPage("login")} />
      )}

      {/* LOGGED IN */}
      {auth && page === "upload" && (
        <Upload
          setDeck={(id) => {
            setDeckId(id);
            setPage("study");
          }}
        />
      )}

      {auth && page === "study" && <Study cards={cards} />}

      {/* PRICING (FREE USERS ONLY) */}
      {auth && !isPremium && (
        <div className="mt-12">
          <Pricing />
        </div>
      )}
    </Layout>
  );
}
