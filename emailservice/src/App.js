import React, { useEffect } from 'react';
import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'
import EmailList from "./EmailList";
import Mail from './Mail';
import SendMail from './SendMail';
import { useDispatch, useSelector} from "react-redux";
import Login from './Login';
import { selectSendMessageIsOpen } from "./features/mailSlice";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { login, selectUser } from './features/userSlice';
function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if(user){
      dispatch(login({
        displayName:user.displayName,
        email: user.email,
        photoUrl: user.photoUrl
      }))
    }
  })
  return (
    <Router>
    {!user ? (
    <Login /> ):
    (<div className="app">
    <Header />
    <div className = "app_body">
    <Sidebar />
    <Switch>
    <Route path = "/mail"><Mail /></Route>
    <Route path = "/"><EmailList /></Route>
    </Switch>
    </div>
    {sendMessageIsOpen && <SendMail />}
    </div> )
    }
    </Router>
  );
}

export default App;
