import React, { useState } from 'react';
import { createComment, editTicket } from './ticket-operations';
import { describeUser } from '../common/operations'
import decode from 'jwt-decode';
import Modal from 'react-modal';
import './tickets.css';

const TicketDetailsModal = ({ ticket={}, isOpen, onClose }) => {

    const [content, setContent] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [edit, setEdit] = useState(ticket.content);
    const token = window.localStorage.getItem("token");
    const id = decode(token);

    const ticketRef = ticket.ticketId;

    const handleSubmit = async(e) => {
        e.preventDefault();

        const userId = await describeUser(id);

        const commentSubmit = {
            userId,
            ticketRef,
            content
        };
    
        await createComment(commentSubmit);

        setContent("");
    };

    const handleEdit = async() => {

        const editSubmit = {
            ticketRef,
            edit
        };

        if(edit!==content){
            await editTicket(editSubmit);
        }

        setEditMode(!editMode);
    }


    return (
        <Modal 
        isOpen = {isOpen}
        style={{
            overlay: {
                backgroundColor: 'rgba(0,0,0,0.1)',
            },
            content: {
                borderRadius: '30px'
            }
        }}
        >

            <h1>TICKET: {ticket._id}</h1>
            <ul>
                <li>User Id: {ticket.userId}</li>
                {editMode ? 
                <input 
                    type="text" 
                    value={edit}
                    onChange={e=> setEdit(e.target.value)}
                /> :
                <li>{ticket.content}</li>
                }
                <li>{ticket.createdAt!==ticket.updatedAt ? 'Created at '+new Date(ticket.createdAt).toLocaleString() : 'Updated at '+new Date(ticket.updatedAt).toLocaleString()}</li>
            </ul>

            <button onClick={()=>handleEdit()}> {editMode ? 'Submit' : "Edit"} </button>

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