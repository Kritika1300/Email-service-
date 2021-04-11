import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InboxIcon from '@material-ui/icons/Inbox';
import StarIcon from '@material-ui/icons/Star';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import NearMeIcon from '@material-ui/icons/NearMe';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import NoteIcon from '@material-ui/icons/Note';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import DuoIcon from '@material-ui/icons/Duo';
import PhoneIcon from '@material-ui/icons/Phone';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { openSendMessage } from './features/mailSlice';

function Sidebar({setSelected, selected}) {
    const dispatch = useDispatch();
    return (
        <div className="sidebar">
            <Button startIcon={<AddIcon fontSize="large" />}
                className="sidebar_compose"
                onClick={() => dispatch(openSendMessage())}>
                Compose
        </Button>
        <div className="sidebar__options">
            <SidebarOption onClick={() => setSelected("inbox")} Icon={InboxIcon} title="Inbox" number={12} selected={selected === "inbox"} />
            <SidebarOption onClick={() => setSelected("starred")} Icon={StarIcon} title="Starred" selected={selected === "starred"} />
            <SidebarOption Icon={AccessTimeIcon} title="Snoozed"  />
            <SidebarOption onClick={() => setSelected("important")} Icon={LabelImportantIcon} title="Important" selected={selected === "important"} />
            <SidebarOption Icon={NearMeIcon} title="Sent"  />
            <SidebarOption Icon={NoteIcon} title="Drafts"  />
            <SidebarOption Icon={ExpandMoreIcon} title="More"  />
        </div>
            <div className="sidebar_footer">
                <div className="sidebar_footerIcons">
                    <IconButton ><PersonIcon className="person"/></IconButton>
                    <IconButton ><DuoIcon className="blue"/></IconButton>
                    <IconButton ><PhoneIcon className="green"/></IconButton>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;