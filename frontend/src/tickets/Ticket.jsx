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
            <h1>{username}</h1>
            <h1>{content}</h1>
        </div>
    );

};

export default Ticket;