import axios from 'axios';
import { getGunServerPort } from '../services/gun';

export const loadPeers = async () => {
    const port = await getGunServerPort;
    const result = axios.get(`http://localhost:${port}/peers`)
    return result.data;
};