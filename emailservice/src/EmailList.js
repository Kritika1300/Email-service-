import React, { useEffect, useState } from 'react';
import './EmailList.css';
import { Checkbox, IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RedoIcon from '@material-ui/icons/Redo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardHideIcon from '@material-ui/icons/KeyboardHide';
import Section from './Section';
import InboxIcon from '@material-ui/icons/Inbox';
import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import EmailRow from './EmailRow';
import { db } from './firebase';

function EmailList({ selected, search }) {
  const [emails, setEmails] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {
    db.collection('emails').orderBy('timestamp', 'desc').onSnapshot(snapshot => setEmails(snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
    }))))
  }, []);

  useEffect(() => {
    if(selected === "inbox") {
      setFilteredList(emails);
    }
    else if(selected === "starred") {
      setFilteredList(emails.filter((email) => {
        return email.data.starred;
      }))
    }
    else if(selected === "important") {
      setFilteredList(emails.filter((email) => {
        return email.data.important;
      }));
    }
    
  }, [selected, emails]);

  useEffect(() => {
    if(search === "") {
      setDisplayList(filteredList);
    }
    else {
      setDisplayList(filteredList.filter((email) => {
        return email.data.subject.toLowerCase().includes(search.toLowerCase())
        || email.data.message.toLowerCase().includes(search.toLowerCase())
        || email.data.to.toLowerCase().includes(search.toLowerCase());
      }));
    }
  }, [search, filteredList]);

  return (
    <div className="emailList">
      <div className="emailList_settings">
        <div className="emailList_settingsLeft">
          <Checkbox />
          <IconButton ><ArrowDropDownIcon /></IconButton>
          <IconButton ><RedoIcon /></IconButton>
          <IconButton ><MoreVertIcon /></IconButton>
        </div>
        <div className="emailList_settingsRight">
          <Checkbox />
          <IconButton ><ChevronLeftIcon /></IconButton>
          <IconButton ><ChevronRightIcon /></IconButton>
          <IconButton ><KeyboardHideIcon /></IconButton>
          <IconButton ><SettingsIcon /></IconButton>
        </div>
      </div>
      <div className="emailList_sections">
        <Section Icon={InboxIcon} title="Primary" color="tomato" selected />
        <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
        <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
      </div>
      <div className="emailList_List">
        {displayList.map(({ id, data: { to, subject, message, timestamp, starred, important } }) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
            starred={starred}
            important={important}
          />
        ))}

      </div>
    </div>
  );
}

export default EmailList;