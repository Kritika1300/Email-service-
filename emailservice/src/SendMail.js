import React from 'react';
import './SendMail.css';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import {useForm} from 'react-hook-form';
function SendMail() {
    const {register,handleSubmit,watch,errors} = useForm();
    const onSubmit = (formData) => {
          console.log(formData);
    };
    return (
        <div className = "sendMail">
        <div className= "sendMail_header">
        <h3>New message</h3>
        <CloseIcon className = "sendMail_close" />
        </div>
        <form onSubmit = {handleSubmit(onSubmit)}>
            <input name = "to" placeholder ="To" type = "text"
             ref = {register({ required : true})}/>
             {errors.to && <p className = "sendMail_error">To is required!</p>}
            <input name = "subject" placeholder ="Subject" 
            type = "text" ref = {register({required: true})}/>
            <input 
            name = "message"
            placeholder ="Message..." 
            type = "text"
            className = "sendMail_message" 
            ref = {register({required: true})} />
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
