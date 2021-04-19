import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from '../actions/userAction';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProfileScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userProfile = useSelector((state) => state.userDetails);
  const { loading, error, user } = userProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userDetails(userInfo.user._id));
  }, [dispatch, userInfo.user._id]);

  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <form className="form" onSubmit={ submitHandler }>
        <div>
          <h1>User Profile</h1>
        </div>
        {
          loading
            ? <LoadingBox></LoadingBox>
            : error
            ? <MessageBox variant="danger">{ error }</MessageBox>
            : <>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={ user.name }>
                </input>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="Enter email"
                  value={ user.email }>
                </input>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="text"
                  placeholder="Enter password">
                </input>
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="text"
                  placeholder="Enter confirmPassword">
                </input>
              </div>
              <div>
                <label />
                <button className="primary" type="submit">Update</button>
              </div>
            </>
        }
      </form>
    </div>
  );
};