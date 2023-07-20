import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START"; //API调用中
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; //API调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL"; //API调用失败

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}
interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
  payload: any;
}
interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
  payload: any;
}

export type RecommendProductAction =
  | FetchRecommendProductFailAction
  | FetchRecommendProductStartAction
  | FetchRecommendProductSuccessAction;

export const fetchRecommendProductFailActionCreactor = (
  data
): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: data,
  };
};
export const fetchRecommendProductStartActionCreactor =
  (): FetchRecommendProductStartAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCTS_START,
    };
  };
export const fetchRecommendProductSuccessActionCreactor = (
  data
): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data,
  };
};
export const giveMeDataActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendProductAction> =>
  (dispatch, getState) => {
    dispatch(fetchRecommendProductStartActionCreactor());
    try {
      axios
        .get("http://123.56.149.216:8080/api/productCollections")
        .then((res) => {
          dispatch(fetchRecommendProductSuccessActionCreactor(res.data));
        });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchRecommendProductFailActionCreactor(error.message));
      }
    }
  };
