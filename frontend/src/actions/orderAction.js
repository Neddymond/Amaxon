import Axios from "axios";
import { 
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS
} from "../constants/orderConstants";

import { CART_EMPTY } from "../constants/cartConstant";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });

  try {
    const { userSignin: { userInfo } } = getState();

    const data = await Axios.post("/api/orders", order, {
      headers: { Authorization: `Bearer ${userInfo.token }` }
    });

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.data.order });
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