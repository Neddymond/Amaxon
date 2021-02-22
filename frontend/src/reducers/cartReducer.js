import { CART_ADD_ITEM } from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  console.log(state.cartItems.length);
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => {
        console.log(x.productId);
        console.log(item.productId);
        return x.productId === item.productId

      });
      if (existItem) {
        console.log("yes");
        return {
          ...state,
          cartItems: state.cartItems.map((x) => x.product === existItem.product
            ? item
            : x
          )
        }
      } else {
        console.log("no");
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
  default:
    return state;
  }
};