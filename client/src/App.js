import React, { useState } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import VideoPage from "./Views/VideoPage";
import store from "./store.js";
import "./App.css";

function PasswordEntry({ onPasswordSuccess }) {
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "lego") {
      // Replace 'yourPassword' with your actual password
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
  const authenticateUser = () => {
    sessionStorage.setItem("isAuthenticated", true);
  };

  console.log(sessionStorage.isAuthenticated);
  return (
    <>
      {sessionStorage.isAuthenticated ? (
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video" element={<VideoPage />} />
          </Routes>
        </Provider>
      ) : (
        <PasswordEntry onPasswordSuccess={authenticateUser} />
      )}
    </>
  );
}

export default App;
