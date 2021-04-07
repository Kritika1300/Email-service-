import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import React from 'react';
import './Mail.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import { useSelector } from 'react-redux';
import { selectOpenMail } from './features/mailSlice';
function Mail() {
  const history = useHistory();
  const selectedMail = useSelector(selectOpenMail);
  return (
    <div className = "mail">
    <div className = "mail_tools">
      <div className = "mail_toolsLeft">
       <IconButton onClick = {() => {history.push("/")}}>
         <ArrowBackIcon />
       </IconButton>
       <IconButton >
         <MoveToInboxIcon />
       </IconButton>
       <IconButton >
         <ErrorIcon />
       </IconButton>
       <IconButton >
         <DeleteIcon />
       </IconButton>
       <IconButton >
         <EmailIcon />
       </IconButton>
       <IconButton >
         <WatchLaterIcon />
       </IconButton>
       <IconButton >
         <CheckCircleIcon />
       </IconButton>
       <IconButton >
         <LabelImportantOutlinedIcon />
       </IconButton>
       <IconButton >
         <MoreVertOutlinedIcon />
       </IconButton>
      </div>
      <div className = "mail_toolsRight">
      <IconButton >
         <UnfoldMoreOutlinedIcon />
       </IconButton>
       <IconButton >
         <PrintOutlinedIcon />
       </IconButton>
       <IconButton >
         <ExitToAppOutlinedIcon />
       </IconButton>
      </div>
    </div>
    <div className = "mail_body">
      <div className = "mail_bodyHeader">
        <h2>{selectedMail ?.subject}</h2>
        <LabelImportantOutlinedIcon className = "mail_important"/>
        <p>{selectedMail ?.title}</p>
        <p className = "mail_time">{selectedMail ?.time}</p>
      </div>
      <div className = "mail_message">
        <p>{selectedMail ?.description}</p>
      </div>
    </div>
    </div>
  );
}

export default Mail;