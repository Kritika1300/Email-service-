import React, { useEffect } from 'react';
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Avatar,IconButton} from '@material-ui/core';
import  ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, login } from './features/userSlice';
import { auth } from './firebase';
function Header() {
    const user = useSelector(selectUser);
    const signOut = () => {
        auth.signOut();
    }
    return (
        <div className = "header">
        <div className = "header_left">
        <IconButton><MenuIcon /></IconButton>
        <img src = "https://images.macrumors.com/t/tOeSavAWwmT_Nsa7e67NCK_J-FA=/400x0/filters:quality(90)/article-new/2020/10/newgmaillogo.0.jpg?lossy" alt = "logo"/>
        {/* <img src = "data:image/png;base64,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"  */}
        {/* alt = "logo" height = "50px" width = "50px" /> */}
        </div>
        <div className = "header_middle">
        <SearchIcon />
        <input placeholder = "Search mail" type = "text" />
        <ArrowDropDownIcon className = "header_inputCaret" />
        </div>
        <div className = "header_right">
        <IconButton><AppsIcon/></IconButton>
        <IconButton><NotificationsIcon/></IconButton>
        <Avatar onClick = {signOut} src = {user ?.photoUrl} />
        </div>
        </div>
    )
}
export default Header;
