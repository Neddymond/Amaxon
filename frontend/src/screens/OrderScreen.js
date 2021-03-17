import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsOrder } from '../actions/orderAction';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

function HandlePay({order}, successPaymentHandler) {
  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: order.totalPrice,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: order.email,
      phonenumber: '07064586146',
      name: order.name,
    },
    customizations: {
      title: 'Payment',
      description: 'Payment for items in cart',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (<button
    className="primary"
    onClick={() => {
      handleFlutterPayment({
        callback: (response) => {
          successPaymentHandler();
          console.log(response);
          closePaymentModal();
        },
        onClose: () => {},
      });
    }}
  >
    Pay Now
  </button>);
};

export default function OrderScreen(props) {
  const orderId = props.match.params.id;

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  const successPaymentHandler = () => {
    //
  }

  return loading
    ? (<LoadingBox></LoadingBox>)
    : error
    ? (<MessageBox variant="danger">{error}</MessageBox>)
    : (
        <div>
          <h1>Order {order.order._id}</h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong> {order.order.shippingAddress.fullName} <br />
                      <strong>Address: </strong>{order.order.shippingAddress.address}, 
                        {order.order.shippingAddress.city},
                        {order.order.shippingAddress.postalCode}
                        {order.order.shippingAddress.country}
                    </p>
                    {
                      order.order.isDelivered
                        ? (<MessageBox variant="success">
                            Delivered at {order.order.deliveredAt}
                          </MessageBox>)
                        : (<MessageBox variant="danger">Not Delivered</MessageBox>)
                    }
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong> {order.order.paymentMethod}
                    </p>
                    {
                      order.order.isPaid
                        ? (<MessageBox variant="success">
                            Paid at {order.order.paidAt}
                          </MessageBox>)
                        : (<MessageBox variant="danger">Not Paid</MessageBox>)
                    }
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {
                        order.order.orderItems.map((item) => (
                          <li key={item.product}>
                            <div className="row">
                              <div>
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="small">
                                </img>
                              </div>
                              <div className="min-30">
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                              </div>
                              <div>{item.qty} * ${item.price} = ${item.qty * item.price}</div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>${order.order.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>${order.order.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>${order.order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div><strong>Order Total</strong></div>
                      <div><strong>${order.order.totalPrice.toFixed(2)}</strong></div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      {!order.isPaid && <HandlePay order={order}></HandlePay>}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
};
