import {
  createStore, 
  compose, 
  applyMiddleware, 
  combineReducers
} from "redux";
import thunk from "redux-thunk"; 
import { productListReducer, productDetailsReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { 
  userSigninReducer,
  userRegisterReducer, 
  userDetailsReducer, 
  userUpdateProfileReducer 
} from "./reducers/userReducer";

import { 
  orderCreateReducer, 
  orderDetailsReducer, 
  orderPayReducer,
  orderListReducer
} from "./reducers/orderReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Paystack"
  } 
};

const reducer = combineReducers({
  productList: productListReducer,
  productInfo: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreation: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  userDetails: userDetailsReducer,
  userUpdatedProfile: userUpdateProfileReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer, 
  initialState, 
  composeEnhancer(applyMiddleware(thunk))
);

export default store;