import React, { useState } from 'react';
import { createComment } from './ticket-operations';
import { describeUser } from '../common/operations'
import decode from 'jwt-decode';
import Modal from 'react-modal';
import './tickets.css';

const TicketDetailsModal = ({ ticket={}, isOpen, onClose }) => {

    const [content, setContent] = useState("");
    const token = window.localStorage.getItem("token");
    const id = decode(token);



    const handleSubmit = async(e) => {
        e.preventDefault();

        const userId = await describeUser(id);

        const commentSubmit = {
            userId,
            content
        };
    
        await createComment(commentSubmit);

        setContent("");
    };


    return (
        <Modal isOpen = {isOpen}>

            <h1>TICKET: {ticket.ticketId}</h1>
            <ul>
                <li>{ticket.userId}</li>
                <li>{ticket.content}</li>
                <li>{ticket.createdAt}</li>
            </ul>

            <form onSubmit={handleSubmit}>
                <h3>COMMENT</h3>
                <input 
                    type="text"
                    placeholder="Enter details here..." 
                    value={content} 
                    onChange={e=> setContent(e.target.value)}
                />
                <button>SUBMIT</button>
            </form>

            

            <button onClick={onClose}>
                Close
            </button>

        </Modal>
    );
}

export default TicketDetailsModal;