import React from 'react';
import './SidebarOption.css';
function SidebarOptions({Icon, title , number, selected}) {
    return (
        <div className = {`sidebarOption ${selected && "sidebarOption--active"}`}>
        <Icon />
        <h3>{title}</h3>
        {number && <p>{number}</p>}
        </div>
    )
}
export default SidebarOptions;