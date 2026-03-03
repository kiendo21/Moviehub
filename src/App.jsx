import { useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Browse from "./pages/Browse.jsx";
import Auth from "./pages/Auth.jsx";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <div className="app">
      <Header tab={tab} onChangeTab={setTab} />

      <main>
        {tab === "home" && <Home onGoBrowse={() => setTab("browse")} />}
        {tab === "browse" && <Browse />}
        {tab === "wishlist" && (
          <div className="container page">
            <h1 className="h1">Yêu thích</h1>
            <p className="muted">Wishlist</p>
          </div>
        )}
        {tab === "auth" && <Auth />}
      </main>
    </div>
  );
}