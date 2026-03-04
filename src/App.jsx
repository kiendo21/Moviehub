import { useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Browse from "./pages/Browse.jsx";
import Auth from "./pages/Auth.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import PersonDetail from "./pages/PersonDetail.jsx";
import { AppProvider } from "./context.jsx";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("home");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedPersonId, setSelectedPersonId] = useState(null);

  const goToMovie = (id) => {
    setSelectedMovieId(id);
    setSelectedPersonId(null);
    setTab("detail");
  };

  const goToPerson = (id) => {
    setSelectedPersonId(id);
    setSelectedMovieId(null);
    setTab("person");
  };

  const goBack = () => {
    if (tab === "detail" || tab === "person") {
      setTab("browse");
    }
    setSelectedMovieId(null);
    setSelectedPersonId(null);
  };

  return (
    <AppProvider>
      <div className="app">
        <Header tab={tab} onChangeTab={(t) => { setTab(t); setSelectedMovieId(null); setSelectedPersonId(null); }} />
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
            <MovieDetail
              movieId={selectedMovieId}
              onGoBack={goBack}
              onGoMovie={goToMovie}
              onGoPerson={goToPerson}
            />
          )}
          {tab === "person" && selectedPersonId && (
            <PersonDetail
              personId={selectedPersonId}
              onGoBack={goBack}
              onGoMovie={goToMovie}
            />
          )}
        </main>
      </div>
    </AppProvider>
  );
}