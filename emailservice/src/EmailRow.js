import { Checkbox, IconButton, Popover } from '@material-ui/core';
import React from 'react';
import './EmailRow.css';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useHistory } from 'react-router';
function EmailRow({id,title,subject,description,time}) {
  const history = useHistory();
  return <div onClick = {() => history.push("/mail")} className = "emailRow">
  <div className = "emailRow_options">
  <Checkbox />
  <IconButton>
      <StarBorderIcon />
  </IconButton>
  <IconButton>
      <LabelImportantOutlinedIcon />
  </IconButton>
  </div>
  <h3 className = "emailRow_title">
  {title}
  </h3>
  <div className = "emailRow_message">
   <h4>{subject}{" "}
   <span className = "emailRow_description">
       -{description}
   </span>
   </h4>
  </div>
  <p className = "emailRow_description"> {time}
  </p>
  </div>
    
}
export default EmailRow;