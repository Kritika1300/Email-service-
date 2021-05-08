import React, { useEffect, useState } from 'react';
import './SendMail.css';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {closeSendMessage, selectSendMailTo, selectSetMessage, selectSetSubject} from './features/mailSlice';
import {db} from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/userSlice';


function SendMail({mailSend, setMailSend }) {
    const {register,handleSubmit,watch,errors} = useForm();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const sendMailTo = useSelector(selectSendMailTo);
    const speechSubject = useSelector(selectSetSubject);
    const speechMessage = useSelector(selectSetMessage);
    const [to, setTo] = useState(sendMailTo);
    const [subject, setSubject] = useState(speechSubject);
    const [message, setMessage] = useState(speechMessage);

    useEffect(() => {
        setSubject(speechSubject);
        setTo(sendMailTo);
        setMessage(speechMessage);
    }, [sendMailTo, speechSubject, speechMessage])

    const onSubmit = (formData) => {
          db.collection('emails').add({
              to: to,
              from: user.email,
              subject: subject,
              message: message,
              starred: false,
              important: false,
              timestamp:firebase.firestore.FieldValue.serverTimestamp()
          });
          dispatch(closeSendMessage());
    };

    useEffect(() => {
        if(mailSend) {
            db.collection('emails').add({
                to: to,
                from: user.email,
                subject: subject,
                message: message,
                starred: false,
                important: false,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            });
            dispatch(closeSendMessage());
            setMailSend(false);
        }
    }, [mailSend, setMailSend])

    return (
        <div className = "sendMail">
        <div className= "sendMail_header">
        <h3>New message</h3>
        <CloseIcon className = "sendMail_close" onClick = {() => dispatch(closeSendMessage())}/>
        </div>
        <form onSubmit = {handleSubmit(onSubmit)}>
            <input name = "to" placeholder ="To" type = "email" value={to} onChange={(e) => setTo(e.target.value)} ref = {register({ required : true})}/>
             {errors.to && <p className = "sendMail_error">To is required!</p>}
            <input name = "subject" placeholder ="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}
            type = "text" ref = {register({required: true})}/>
             {errors.subject && <p className = "sendMail_error">Subject is required!</p>}
            <input 
            name = "message"
            placeholder ="Message..." 
            type = "text"
            value={message} onChange={(e) => setMessage(e.target.value)}
            className = "sendMail_message" 
            ref = {register({required: true})} />
             {errors.message && <p className = "sendMail_error">Message is required!</p>}
            <div className = "sendMail_options">
                <Button
                className = "sendMail_send"
                variant = "contained"
                color = "primary"
                type = "submit">
                Send
                </Button>
            </div>
        </form>
        </div>
    );
}
export default SendMail;
