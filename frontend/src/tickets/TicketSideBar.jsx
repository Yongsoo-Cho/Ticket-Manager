import React, { useEffect, useState } from 'react';
import TicketCreate from './TicketCreate';
import Logout from '../uikit/logout.svg';
import logout from '../utils/logout';
import { describeUser } from '../common/operations'
import decode from 'jwt-decode';
import './tickets.css';

const TicketSideBar = () => {
    const [name, setName] = useState('');
    const [admin, setAdmin] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const userId = await describeUser(decode(window.localStorage.getItem("token")).userId);
            setName(userId.firstName+' '+userId.lastName);
            setAdmin(userId.isAdmin ? 'Admin' : 'Employee');
        }
        fetchData();
    }, []);


    return (
        <div className = 'ticket-sidebar'>
            <h1>{name}</h1>
            <h3>{admin}</h3>

            <TicketCreate/>

            <button onClick={logout}>
                <img src={Logout} alt="Logout" id='logoutButton'/>
            </button>
        </div>
    );
};

export default TicketSideBar;