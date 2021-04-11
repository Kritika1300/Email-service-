import React from 'react';
import './SidebarOption.css';
function SidebarOptions({onClick, Icon, title , number, selected}) {
    return (
        <div onClick={onClick} className = {`sidebarOption ${selected && "sidebarOption--active"}`}>
        <Icon />
        <h3>{title}</h3>
        {number && <p>{number}</p>}
        </div>
    )
}
export default SidebarOptions;