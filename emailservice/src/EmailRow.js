import { Checkbox, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './EmailRow.css';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useHistory } from 'react-router';
import { selectMail } from './features/mailSlice';
import { useDispatch } from 'react-redux';
import {db} from './firebase';

function EmailRow({ id, title, subject, description, time, starred, important }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const openMail = () => {
    dispatch(selectMail({
      id, title, subject, description, time, important
    }));
    history.push("/mail")
  };
  const [starMail, setStarMail] = useState(starred);
  const [imp,setImpMail] = useState(important);
  const starMailFunc = () => {
    setStarMail((oldval) => {
      db.collection("emails").doc(id).update({
        starred: !oldval
      })
      return !oldval;
    });
  }
  const impMail = () => {
    setImpMail((oldval) => {
      db.collection("emails").doc(id).update({
        important : !oldval
      })
      return !oldval;
    })
  }
  return <div className="emailRow">
    <div className="emailRow_options">
      <Checkbox />
      <IconButton>
        <StarBorderIcon onClick = { starMailFunc } className={starMail && "starred"}/>
      </IconButton>
      <IconButton>
        <LabelImportantOutlinedIcon onClick = {impMail} className = {imp && "important"}/>
      </IconButton>
    </div>
    <h3 onClick={openMail} className="emailRow_title">
      {title}
    </h3>
    <div onClick={openMail} className="emailRow_message">
      <h4>{subject}{" "}
        <span className="emailRow_description">
          -{description}
        </span>
      </h4>
    </div>
    <p onClick = {openMail} className="emailRow_time"> {new Date(time).toDateString()}
    </p>
  </div>

}
export default EmailRow;