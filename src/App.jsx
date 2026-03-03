import { useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Browse from "./pages/Browse.jsx";
import Auth from "./pages/Auth.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import { AppProvider } from "./context.jsx";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("home");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const goToMovie = (id) => {
    setSelectedMovieId(id);
    setTab("detail");
  };

  const goBack = () => {
    setSelectedMovieId(null);
    setTab("browse");
  };

  return (
    <AppProvider>
      <div className="app">
        <Header tab={tab} onChangeTab={(t) => { setTab(t); setSelectedMovieId(null); }} />
        <main>
          {tab === "home" && (
            <Home
              onGoBrowse={() => setTab("browse")}
              onGoMovie={goToMovie}
            />
          )}
          {tab === "browse" && (
            <Browse onGoMovie={goToMovie} />
          )}
          {tab === "wishlist" && (
            <Wishlist onGoMovie={goToMovie} />
          )}
          {tab === "auth" && <Auth />}
          {tab === "detail" && selectedMovieId && (
            <MovieDetail movieId={selectedMovieId} onGoBack={goBack} onGoMovie={goToMovie} />
          )}
        </main>
      </div>
    </AppProvider>
  );
}