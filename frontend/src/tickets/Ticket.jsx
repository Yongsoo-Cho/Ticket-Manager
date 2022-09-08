import React from 'react';
import './tickets.css';

const Ticket = ({
    content, 
    ticketId,
    createdAt,
    username,
    seeDetails
}) => {
    

    return(
        <div className = 'ticket' onClick = {seeDetails}>
            <div>
                <h3>{username}</h3>
                <h3 className = 'ticket-date'>{new Date(createdAt).toLocaleString()}</h3>
            </div>
            <h1>{content.length<50 ? content : content.substring(0,50)+'...'}</h1>
        </div>
    );

};

export default Ticket;