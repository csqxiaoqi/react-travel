import React, { useEffect } from "react";
import styles from "./searchPage.module.css";
import { Spin } from "antd";
import { FilterArea } from "../../components/filter";
import { ProductList } from "../../components/productList";
import { useParams, useLocation } from "react-router-dom";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layout/mainLayout";
type MatchParams = {
  keyword: string;
};

export const SearchPage: React.FC = () => {
  const { keyword } = useParams<MatchParams>();

  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((state) => state.productSearch.error);
  const pagination = useSelector((state) => state.productSearch.pagination);
  const productList = useSelector((state) => state.productSearch.data);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (keyword) {
      dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords: keyword }));
    }
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    if (keyword) {
      dispatch(searchProduct({ nextPage, pageSize, keywords: keyword }));
    }
  };

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错:{error}</div>;
  }
  return (
    <>
      <MainLayout>
        {/* 分类过滤器 */}
        <div className={styles["product-list-container"]}>
          <FilterArea />
        </div>
        {/* 产品列表 */}
        <div className={styles["product-list-container"]}>
          <ProductList
            data={productList}
            paging={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </MainLayout>
    </>
  );
};
