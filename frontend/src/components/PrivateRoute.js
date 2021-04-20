import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignin = useSelector(state => state.userSignin);
  console.log(userSignin)
  const { userInfo } = userSignin;
  console.log(userInfo)

  return (
    <Route
      { ...rest }
      render={
        (props) => userInfo
          ? (<Component { ...props }></Component>)
          : (console.log("here"),<Redirect to="/signin" />)
      }
    ></Route>
  );
};
