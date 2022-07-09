import React, { useEffect, useState } from 'react';
import { listTickets } from './ticket-operations';
import Ticket from './Ticket';
import TicketDetailsModal from './TicketDetailsModal';
import logout from '../utils/logout';

const TicketsList = () => {
    const [prefix, setPrefix] = useState('');
    const [ticketList, setTicketList] = useState([]);
    const [ticketId, setTicketId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [ticketMap, setTicketMap] = useState({});

    useEffect(() => {

        const fetchData = async () => {
            const ticketsResponse = await listTickets({ prefix });
            setTicketList(ticketsResponse);
            const map ={};
            for(let i=0;i<ticketsResponse.length; i++){
                const ticket =ticketsResponse[i];
                map[ticket._id] = ticket;
            }
            setTicketMap(map);
        };

        fetchData();
    }, [prefix]);

    const ticketComponents = ticketList.map(t => {
        return (
            <Ticket
                key = {t._id}
                content = {t.content}
                createdAt = {t.createdAt}
                username = {t.username}
                ticketId = {t._id}
                seeDetails = {() => {
                    setTicketId(t._id);
                    setIsOpen(true);

                }} 
            />
        );
    });

    return (
        <div className = 'ticket-list-container'>
            <h3>Hello</h3>

            <input 
                type="text" 
                placeholder="Search tickets"
                onChange={e => setPrefix(e.target.value)}
                value = {prefix}
            
            />

            {ticketComponents}

            <TicketDetailsModal 
                ticket = {ticketMap[ticketId]}
                onClose = {() => setIsOpen(false)}
                isOpen = {isOpen}
            />

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export default TicketsList;