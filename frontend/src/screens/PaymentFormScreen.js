import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PaystackButton } from "react-paystack";
import { detailsOrder, payOrder } from '../actions/orderAction';

function PaymentFormScreen(props) {
  const orderDetails = useSelector(state => state.orderDetails);
  // console.log(orderDetails);
  const { order, loading, error } = orderDetails;
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successPay) {
      // dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(order.order._id));
      props.history.push(`/order/${order.order._id}`);
    }
  }, [order, dispatch, props.history, successPay]);

  const submitPaymentHandler = () => {
    dispatch(payOrder(order))
  }

  const componentProps = {
    email: order.email,
    amount: (amount * 100),
    metadata: {
      name: order.name,
      phone,
    },
    publicKey: process.env.REACT_APP_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: () => submitPaymentHandler(),
    onClose: () => alert("Reconsider purchasing our product")
  };

  return (
    <div>
      <div>
        <form className="form">
          <div>
            <h1>Payment</h1>
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input 
              type="text" 
              id="amount"  
              required 
              onChange={ e => setAmount(e.target.value) }
            ></input>
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="text" 
              id="phone"  
              required 
              onChange={ e => setPhone(e.target.value) }
            ></input>
          </div>
        </form>
        <PaystackButton className="paystack-button" {...componentProps} />
    </div>
    </div>
  )
}

export default PaymentFormScreen
