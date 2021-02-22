import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const cart  = useSelector((state) => state.cart);
  const { cartItems } = cart;
  
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">amaxon</Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {
                // console.log(cartItems),
                cartItems.length > 0 && (
                  <span className="badge">{ cartItems.length }</span>
                )
              }
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
