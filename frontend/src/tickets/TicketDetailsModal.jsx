import React, { useState, useEffect } from 'react';
import { createComment, editTicket, deleteTicket, listComments } from './ticket-operations';
import decode from 'jwt-decode';
import Modal from 'react-modal';
import './tickets.css';

const TicketDetailsModal = ({ ticket={}, isOpen, onClose }) => {

    const [content, setContent] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [commentMap, setCommentMap] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const token = window.localStorage.getItem("token");
    const {id} = decode(token);

    const ticketId = ticket._id;

    useEffect(() => {
        const fetchData = async () => {
            const commentsResponse = await listComments({ticketId});
            setCommentList(commentsResponse.reverse());
            const map ={};
            for(let i=0;i<commentsResponse.length; i++){
                const comment = commentsResponse[i];
                map[comment._id] = comment;
            }
            setCommentMap(map);
        };

        fetchData();

    }, [commentList]);

    useEffect(()=> {
        setContent(ticket.content);
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const userId = id;

        const commentSubmit = {
            userId,
            ticketId,
            content: commentContent
        };
        console.log(userId);
        console.log(ticketId);
        await createComment(commentSubmit);

        setCommentContent("");
    }

    const handleEdit = async() => {
        const editSubmit = {
            content,
            ticketId
        };

        await editTicket(editSubmit);
        
        setEditMode(!editMode);
    }

    const handleDelete = async(ticketId) => {
        onClose();
        await deleteTicket(ticketId);
    }

    const commentComponents = commentList.map(c => {
        return (
            <div className = 'comment-list'>
                <li>{c.content}</li>
            </div>
        );
    });


    return (
        <Modal 
        isOpen = {isOpen}
        style={{
            overlay: {
                backgroundColor: 'rgba(0,0,0,0.1)'
            },
            content: {
                borderRadius: '30px'
            }
        }}
        >
            <div className='modal-close-container'>
                <button className='modal-close' onClick={onClose}>
                        Close
                </button>

                <button className='delete-ticket' 
                    onClick={ () => {if(window.confirm("Are you sure you want to delete this ticket?")){handleDelete(ticket._id);}} }
                >
                    Delete
                </button>

            </div>

            <h1 className='id-desc'>TICKET: {ticket._id}</h1>

            <div>
                <h2 className='user-id'>User Id: {ticket.userId}</h2>
                <h2 className='ticket-submit-date'>{ticket.createdAt==ticket.updatedAt ? 'Created at '+ new Date(ticket.createdAt).toLocaleString() : 'Updated at '+ new Date(ticket.updatedAt).toLocaleString()}</h2>

                {editMode ? 
                <textarea 
                    type="text" 
                    value={content}
                    onChange={e=> setContent(e.target.value)}
                    className = 'comment-edit-textarea'
                /> :
                <p>{content}</p>
                } 
            </div>

            <button onClick={()=>handleEdit()}> {editMode ? 'Submit' : "Edit"} </button>
            
            <h2 className='id-desc'>Comments</h2>
            {commentComponents}

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Enter details here..." 
                    value={commentContent} 
                    onChange={e=> setCommentContent(e.target.value)}
                />
                <button>SUBMIT</button>
            </form>

        </Modal>
    );
}

export default TicketDetailsModal;