import axios from 'axios';
import {API_ENDPOINT} from '../constants';

export const describeUser = async (id) => {
    const response = await axios.post(`${API_ENDPOINT}/user/describe`, {userId: id});

    return response.data;
};