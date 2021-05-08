import React from 'react';
import { auth, provider } from './firebase';
import {Button} from "@material-ui/core";
import './Login.css';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth.signInWithPopup(provider)
    .then(({user}) => {
       dispatch(login({
         displayName:user.displayName,
         email: user.email,
         photoUrl: user.photoURL,
       }))
    })
    .catch(error => alert(error.message));
  };
  
  return (
  <div className = "login">
    <div className = "login_container">
      <h1>GoMail</h1>
      <Button variant = "contained" color = "primary" onClick = {signIn}>Login</Button>
    </div>
  </div>
  );
}

export default Login;
