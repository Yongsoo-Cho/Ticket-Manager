import React from 'react';
import './tickets.css';

const Ticket = ({
    content, 
    ticketId,
    createdAt,
    username,
    status,
    seeDetails
}) => {

    const fontColors = new Map();
    fontColors.set('Resolved', '#63CB43');
    fontColors.set('Dropped', '#F6BC3D');
    fontColors.set('Unresolved', '#EB5B55');
    
    return(
        <div>
            <div className = 'ticket'  onClick = {seeDetails}>
                <div>
                    <h3>{username}</h3>
                    <h3 className = 'ticket-date'>{new Date(createdAt).toLocaleString()}</h3>
                    <span></span>
                </div>
                <h1>{content.length<50 ? content : content.substring(0,50)+'...'}</h1>

                <div className = 'status-container' style={{ backgroundColor: fontColors.get(status) }}></div>
            </div>
            
        </div>
    );

};

export default Ticket;