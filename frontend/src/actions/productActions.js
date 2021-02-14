import { 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_FAIL
} from "../constants/productConstants"
import Axios from "axios";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST
  });

  try {
    const { data } = await Axios.get("/api/products");
    // console.log(data);
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