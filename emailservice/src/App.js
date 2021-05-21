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
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { openSendMessage, setSubject, setMessage } from './features/mailSlice';

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("inbox");
  const [search, setSearch] = useState("");
  const [micStatus, setMicStatus] = useState(false);

  const commands = [
    {
      command: "send email to *",
      callback: (email) => {
        console.log("Composing Mail...", email)
        dispatch(openSendMessage({email}));
        resetTranscript();
      },
    },
    {
      command: "the subject is *",
      callback: (subject) => {
        console.log("The subject is", subject);
        dispatch(setSubject({subject}));
        resetTranscript();
      },
    },
    {
      command: "the message is *",
      callback: (message) => {
        console.log("The message is", message);
        dispatch(setMessage({message}));
        resetTranscript();
      },
    },
    {
      command: "reset",
      callback: () => {
        console.log("clearing transcript");
        resetTranscript();
      },
    },
    {
      command: "send",
      callback: () => {
        console.log("sending email");
        setMailSend(true);
        resetTranscript();
      },
    },
    {
      command: "reset email",
      callback: () => {
        console.log("Resetting email");
        dispatch(openSendMessage({email: ""}));
        dispatch(setSubject({subject: ""}));
        dispatch(setMessage({message: ""}));
        resetTranscript();
      },
    },
    {
      command: "search *",
      callback: (term) => {
        console.log("searching for",term);
        setSearch(term);
        resetTranscript();
      },
    },
    {
      command: "reset search",
      callback: () => {
        console.log("Resetting search");
        setSearch("");
        resetTranscript();
      },
    },
    ,
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [mailSend, setMailSend] = useState(false);
  const toggleMic = () => {
        setMicStatus((currentMicStatus) => {
            const newMicStatus = !currentMicStatus;
            if(newMicStatus) {
                SpeechRecognition.startListening({ continuous: true});
            }
            else {
                console.log("Stopping")
                SpeechRecognition.stopListening();
                resetTranscript();
            }
            return newMicStatus;
        });
    }

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
    <Header search = {search} setSearch = {setSearch}  micStatus={micStatus} toggleMic={toggleMic}/>
    <div className = "app_body">
    <Sidebar  selected={selected} setSelected ={setSelected} />
    <Switch>
    <Route path = "/mail"><Mail /></Route>
    <Route path = "/"><EmailList search={search} selected={selected} /></Route>
    </Switch>
    </div>
    {sendMessageIsOpen && <SendMail mailSend={mailSend} setMailSend={setMailSend} />}
    {transcript && <div className="transcript">{transcript}</div> }
    </div> )
    }
    </Router>
  );
}

export default App;
