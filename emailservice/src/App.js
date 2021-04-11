import React, { useEffect, useState } from 'react';
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
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("inbox");
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(login({
            displayName:user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch]);
  return (
    <Router>
    {!user ? (
    <Login /> ):
    (<div className="app">
    <Header search = {search} setSearch = {setSearch} />
    <div className = "app_body">
    <Sidebar  selected={selected} setSelected ={setSelected} />
    <Switch>
    <Route path = "/mail"><Mail /></Route>
    <Route path = "/"><EmailList search={search} selected={selected} /></Route>
    </Switch>
    </div>
    {sendMessageIsOpen && <SendMail />}
    </div> )
    }
    </Router>
  );
}

export default App;
