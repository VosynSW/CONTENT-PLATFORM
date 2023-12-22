import React, { useState } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import VideoPage from "./Views/VideoPage";
import POC from "./Views/POCPage";
import Playlists from "./Views/Playlists.jsx";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import store from "./store.js";
import "./App.css";

function PasswordEntry({ onPasswordSuccess }) {
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "lego") {
      onPasswordSuccess();
      window.location.reload();
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="temp-login">
      <form onSubmit={handlePasswordSubmit}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const authenticateUser = () => {
    sessionStorage.setItem("isAuthenticated", true);
  };

  const Layout = ({ children }) => {
    return (
      <div className="home-container">
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isPortrait={isPortrait}
          setIsPortrait={setIsPortrait}
        />

        <div
          className={`home-body ${isCollapsed ? "collapsed" : ""} ${
            isPortrait ? "portrait" : ""
          }`}
        >
          <Navbar />
          {children}
        </div>
      </div>
    );
  };

  return (
    <>
      {sessionStorage.isAuthenticated ? (
        <Provider store={store}>
          <Routes>
            <Route path="/CONTENT-PLATFORM/" element={<POC />} />
            <Route
              path="/CONTENT-PLATFORM/home"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/CONTENT-PLATFORM/video"
              element={
                <Layout>
                  <VideoPage />
                </Layout>
              }
            />
            <Route
              path="/CONTENT-PLATFORM/playlist"
              element={
                <Layout>
                  <Playlists />
                </Layout>
              }
            />
          </Routes>
        </Provider>
      ) : (
        <PasswordEntry onPasswordSuccess={authenticateUser} />
      )}
    </>
  );
}

export default App;
