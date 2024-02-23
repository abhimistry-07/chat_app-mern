import { io } from 'socket.io-client';

const BASEURL = process.env.REACT_APP_BASE_URL;

export const socket = io(BASEURL);