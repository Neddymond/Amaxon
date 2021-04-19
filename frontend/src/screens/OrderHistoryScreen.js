import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listOrder } from '../actions/orderAction';

export default function OrderHistoryScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrder());
  }, [dispatch]);

  return (
    <div>
      <h1>Order History</h1>
      { loading 
        ? (<LoadingBox></LoadingBox>)
        : error
        ? (<MessageBox variant="danger">{ error }</MessageBox>)
        : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              { orders.orders.map((order) => (
                <tr key={ order._id }>
                  <td>{ order._id }</td>
                  <td>{ order.createdAt.substring(0, 10) }</td>
                  <td>{ order.totalPrice.tofixed(2) }</td>
                  <td>{ order.isPaid ? order.paidAt.substring(0, 10): "No" }</td>
                  <td>{ order.isDelivered ? order.deliveredAt.substring(0, 10): "No" }</td>
                  <td>
                    <button 
                      type="button" 
                      className="small" 
                      onClick={ ()=> props.history.push(`order/${order._id}`) }
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  )
}
