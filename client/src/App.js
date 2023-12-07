import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import VideoPage from "./Views/VideoPage";
import store from './store.js';
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<VideoPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
