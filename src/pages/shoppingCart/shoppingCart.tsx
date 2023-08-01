import React from "react";
import styles from "./shopingCart.module.css";
import { MainLayout } from "../../layout/mainLayout";
import { Row, Col, Affix } from "antd";
import { ProductList } from "../../components/productList";
import { PaymentCard } from "../../components/paymentCard";
export const ShoppingCart: React.FC = () => {
  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            {/* <ProductList /> */}
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["product-cart-container"]}>
              {/* <PaymentCard /> */}
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
