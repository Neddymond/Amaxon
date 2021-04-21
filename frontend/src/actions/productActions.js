import { 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from "../constants/productConstants"
import Axios from "axios";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST
  });

  try {
    const { data } = await Axios.get("/api/products");
    console.log(data);
    dispatch({ 
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err.message
    });
  };
};

export const productDetails = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId
  });

  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    // console.log(data);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    });
  };
};