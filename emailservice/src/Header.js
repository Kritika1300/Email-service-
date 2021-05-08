import React, { useEffect, useState } from 'react';
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, login } from './features/userSlice';
import MicIcon from '@material-ui/icons/Mic';
import { auth } from './firebase';
import MicOffIcon from '@material-ui/icons/MicOff';

function Header({search, setSearch, micStatus, toggleMic}) {
    const user = useSelector(selectUser);
    
    const signOut = () => {
        auth.signOut();
    }
    
    return (
        <div className="header">
            <div className="header_left">
                <IconButton><MenuIcon /></IconButton>
                <h1> GoMail</h1>
            </div>
            <div className="header_middle">
                <SearchIcon />
                <input onChange={(e) => setSearch(e.target.value)} value = {search} placeholder="Search mail" type="text" />
                <ArrowDropDownIcon className="header_inputCaret" />
            </div>
            <div className="header_right">
                <IconButton> {micStatus ? <MicIcon onClick={toggleMic}/> : <MicOffIcon onClick={toggleMic}/>} </IconButton>
                <IconButton><AppsIcon /></IconButton>
                <IconButton><NotificationsIcon /></IconButton>
                <Avatar onClick={signOut} src={user?.photoUrl} />
            </div>
        </div>
    )
}
export default Header;
