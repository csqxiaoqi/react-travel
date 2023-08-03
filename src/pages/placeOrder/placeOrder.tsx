import React from "react";
import styles from "./placeOrder.module.css";
// import { PaymentForm } from "../../components/paymentForm";
import { CheckOutCard } from "../../components/checkOutCard";
import { MainLayout } from "../../layout/mainLayout";
import { Row, Col } from "antd";
export const PlaceOrder: React.FC = () => {
  return (
    <MainLayout>
      <Row>
        <Col span={12}>{/* <PaymentForm /> */}</Col>
        <Col span={12}>{/* <CheckOutCard /> */}</Col>
      </Row>
    </MainLayout>
  );
};
