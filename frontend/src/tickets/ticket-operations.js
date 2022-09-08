import axios from 'axios';
import {API_ENDPOINT} from '../constants';

export const describeTicket = async (ticketId) => {
    if (ticketId === '') return {};
    
    const response = await axios.get(`${API_ENDPOINT}/ticket/${ticketId}`);
    return response.data;
};

export const createTicket = async (body) => {
    const response = await axios.post(`${API_ENDPOINT}/ticket/create`, body);

    return response.data;
};

export const editTicket = async (body) => {
    const response = await axios.post(`${API_ENDPOINT}/ticket/edit`, body);

    return response.data;
};

export const createComment = async (body) => {
    const response = await axios.post(`${API_ENDPOINT}/comment/create`, body);

    return response.data;
};

export const listTickets = async (body) => {
    const response = await axios.post(`${API_ENDPOINT}/ticket/list`, body);
    console.log(response.data);
    return response.data;
};