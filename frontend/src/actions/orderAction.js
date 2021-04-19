import Axios from "axios";
import { 
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS
} from "../constants/orderConstants";

import { CART_EMPTY } from "../constants/cartConstant";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });

  try {
    const { userSignin: { userInfo } } = getState();

    const { data } = await Axios.post("/api/orders", order, {
      headers: { Authorization: `Bearer ${ userInfo.token }` }
    });

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY});
    localStorage.removeItem("cartItems");
  } catch (e) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: e.response && e.response.data.message
        ? e.response.data.message
        : e.message
    });
  };
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });

  try {
    const { userSignin: { userInfo } } = getState();

    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${ userInfo.token }`}
    });

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  };
};

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  console.log(order, paymentResult);

  try {
    const { userSignin: { userInfo } } = getState();

    const { data } = await Axios.put(`/api/orders/${order.order._id}/pay`, order, {
      headers: { Authorization: `Bearer ${ userInfo.token }`}
    });

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  };
};

export const listOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });

  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await Axios.get(`api/orders/me`, {
      headers: { Authorization: `Bearer ${userInfo.token }`}
    });

    console.log(data)
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  };
};