import React from 'react';
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Avatar,IconButton} from '@material-ui/core';
import  ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
function Header() {
    return (
        <div className = "header">
        <div className = "header_left">
        <IconButton><MenuIcon /></IconButton>
        <img src = "https://images.macrumors.com/t/tOeSavAWwmT_Nsa7e67NCK_J-FA=/400x0/filters:quality(90)/article-new/2020/10/newgmaillogo.0.jpg?lossy" alt = "logo"/>
        </div>
        <div className = "header_middle">
        <SearchIcon />
        <input placeholder = "Search mail" type = "text" />
        <ArrowDropDownIcon className = "header_inputCaret" />
        </div>
        <div className = "header_right">
        <IconButton><AppsIcon/></IconButton>
        <IconButton><NotificationsIcon/></IconButton>
        <Avatar />
        </div>
        
        </div>
    )
}
export default Header;
