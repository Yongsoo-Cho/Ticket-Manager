import React, { useState, useEffect } from 'react';
import { createComment, editTicket, deleteTicket, listComments } from './ticket-operations';
import { describeUser } from '../common/operations'
import decode from 'jwt-decode';
import Modal from 'react-modal';
import './tickets.css';

const TicketDetailsModal = ({ ticket={}, isOpen, onClose }) => {

    const [content, setContent] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [commentMap, setCommentMap] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [edit, setEdit] = useState('');
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
        setEdit(ticket.content);
    },[]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const userId = id;

        const commentSubmit = {
            userId,
            ticketId,
            content
        };
        console.log(userId);
        console.log(ticketId);
        await createComment(commentSubmit);

        setContent("");
    }

    const handleEdit = async() => {

        const editSubmit = {
            content,
            edit
        };

        if(edit!==content){
            await editTicket(editSubmit);
        }

        setEditMode(!editMode);
    }

    const handleDelete = async(ticketId) => {
        onClose();
        await deleteTicket(ticketId);
    }

    const commentComponents = commentList.map(c => {
        return (
            <div>
                {c.content}
            </div>
        );
    });


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
                
                <li>{ticket.createdAt==ticket.updatedAt ? 'Created at '+ new Date(ticket.createdAt).toLocaleString() : 'Updated at '+ new Date(ticket.updatedAt).toLocaleString()}</li>
            </ul>

            {commentComponents}

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

            <div className='modal-bottom-container'>
                <button className='modal-close' onClick={onClose}>
                        Close
                </button>

                <button className='delete-ticket' onClick={ () => handleDelete(ticket._id) }>
                    Delete
                </button>

            </div>

        </Modal>
    );
}

export default TicketDetailsModal;