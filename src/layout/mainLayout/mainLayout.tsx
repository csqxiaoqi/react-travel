import React from "react";
import styles from "./mainLayout.module.css";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
interface PropsType {
  children: React.ReactNode;
}
export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles["page-content"]}>{children}</div>
      <Footer />
    </>
  );
};
