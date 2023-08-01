import React from "react";
// import { Header, Footer } from "./components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  RegisterPage,
  SignInPage,
  DetailPage,
  HomePage,
  ShoppingCart,
} from "./pages";
import { useSelector } from "./redux/hooks";
import { SearchPage } from "./pages";

import styles from "./App.module.css";

const PrivateRoot = ({ children }) => {
  const jwt = useSelector((state) => state.user.token);
  return jwt ? children : <Navigate to="/signin"></Navigate>;
};

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
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoot>
                <ShoppingCart></ShoppingCart>
              </PrivateRoot>
            }
          />
          <Route path="*" element={<h1>404 not found !</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
