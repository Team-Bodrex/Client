import { io } from "socket.io-client";
const socket = io("https://tictactoe-timbodrex-server.valdifirstianto.online", { autoConnect: false });
export default socket;
