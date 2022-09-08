import React, { useEffect, useState } from 'react';
import { listTickets } from './ticket-operations';
import TicketSideBar from './TicketSideBar';
import Ticket from './Ticket';
import TicketDetailsModal from './TicketDetailsModal';
import './tickets.css';

const TicketsList = () => {
    const [prefix, setPrefix] = useState('');
    const [ticketList, setTicketList] = useState([]);
    const [ticketId, setTicketId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [ticketMap, setTicketMap] = useState({});

    useEffect(() => {

        const fetchData = async () => {
            const ticketsResponse = await listTickets({ prefix });
            setTicketList(ticketsResponse.reverse());
            const map ={};
            for(let i=0;i<ticketsResponse.length; i++){
                const ticket =ticketsResponse[i];
                map[ticket._id] = ticket;
            }
            setTicketMap(map);
        };

        fetchData();
    }, [prefix, ticketList]);

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
            <div className = 'ticket-listings'>
                <div className = 'input-container'>
                    <input 
                        type="text" 
                        placeholder="Search tickets..."
                        onChange={e => setPrefix(e.target.value)}
                        value = {prefix}
                    />
                    <button onClick={()=>setPrefix('')}>x</button>
                </div>
                

                {ticketComponents}

                <TicketDetailsModal 
                    ticket = {ticketMap[ticketId]}
                    onClose = {() => setIsOpen(false)}
                    isOpen = {isOpen}
                />
            </div>

            <TicketSideBar/>
        </div>
    );
};

export default TicketsList;