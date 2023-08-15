import React from "react";
import styles from "./placeOrder.module.css";
import { PaymentForm } from "../../components/paymentForm";
import { CheckOutCard } from "../../components/checkOutCard";
import { MainLayout } from "../../layout/mainLayout";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { placeOrder } from "../../redux/order/silce";

import { Row, Col } from "antd";
export const PlaceOrder: React.FC = () => {
  const jwt = useSelector((state) => state.user.token) as string;
  const loading = useSelector((state) => state.order.loading);
  const order = useSelector((state) => state.order.currentOrder);
  const dispatch = useAppDispatch();
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(placeOrder({ jwt, orderId: order.id }));
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};
