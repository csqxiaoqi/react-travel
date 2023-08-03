import React, { useEffect } from "react";
// import { Header, Footer } from "./components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  RegisterPage,
  SignInPage,
  DetailPage,
  HomePage,
  ShoppingCart,
  PlaceOrder,
} from "./pages";
import { useSelector, useAppDispatch } from "./redux/hooks";
import { SearchPage } from "./pages";
import { getShoppingCart } from "./redux/shoppingCart/slice";

import styles from "./App.module.css";

const PrivateRoot = ({ children }) => {
  const jwt = useSelector((state) => state.user.token);
  return jwt ? children : <Navigate to="/signin"></Navigate>;
};

function App() {
  const jwt = useSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);
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
          <Route
            path="/placeOrder"
            element={
              <PrivateRoot>
                <PlaceOrder />
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
