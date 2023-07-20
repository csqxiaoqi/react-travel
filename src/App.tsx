import React from "react";
// import { Header, Footer } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage, SignInPage, DetailPage, HomePage } from "./pages";

import { SearchPage } from "./pages";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="*" element={<h1>404 not found !</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
