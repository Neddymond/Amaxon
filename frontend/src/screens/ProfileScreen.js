import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userDetails, updateUserProfile } from '../actions/userAction';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userProfile = useSelector((state) => state.userDetails);
  const { loading, error, user } = userProfile;

  const userUpdatedProfile = useSelector((state) => state.userUpdatedProfile);
  const { 
    success: successUpdate, 
    error: errorUpdate, 
    loading: loadingUpdate 
  } = userUpdatedProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(userDetails(userInfo.user._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo.user._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    password !== confirmPassword
      ? alert("Password and Confirm Password does not match")
      : dispatch(updateUserProfile({
        userId: user._id,
        name,
        email,
        password
      }));
  };

  return (
    <div>
      <form className="form" onSubmit={ submitHandler }>
        <div>
          <h1>Update Profile</h1>
        </div>
        {
          loading
            ? <LoadingBox></LoadingBox>
            : error
            ? <MessageBox variant="danger">{ error }</MessageBox>
            : <>
              { loadingUpdate && <LoadingBox></LoadingBox> }
              { errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
              { 
                successUpdate && <MessageBox variant="success">
                  Profile updated successfully
                </MessageBox>
              }
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={ name }
                  onChange={(e) => setName(e.target.value)}>
                </input>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="Enter email"
                  value={ email }
                  onChange={(e) => setEmail(e.target.value)}>
                </input>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}>
                </input>
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}>
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