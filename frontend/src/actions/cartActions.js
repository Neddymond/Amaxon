import { CART_ADD_ITEM } from "../constants/cartConstant";
import Axios from "axios";

export const addToCart = (productId, qty) => async(dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      productId: data._id,
      qty
    }
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};