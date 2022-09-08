import React, { useState } from "react";
import { createTicket } from './ticket-operations';
import { describeUser } from '../common/operations';
import decode from 'jwt-decode';
import './tickets.css';

const TicketCreate = () => {
    const [content, setContent] = useState("");
    const token = window.localStorage.getItem("token");

    const handleSubmit = async(e) => {
        e.preventDefault();

        const userId = await describeUser(decode(token).userId);

        const ticket = {
            userId,
            content
        };
    
       await createTicket(ticket);

        setContent("");
    };

    return(
        <div className = 'ticket-create-container'>
          <form onSubmit={handleSubmit} id="ticketForm">
            <textarea 
              type="text"
              placeholder="Enter details here..." 
              value={content} 
              onChange={e=> setContent(e.target.value)}
              required
            />

            <button>Submit</button>
          </form>
        </div>
    );


};

export default TicketCreate;