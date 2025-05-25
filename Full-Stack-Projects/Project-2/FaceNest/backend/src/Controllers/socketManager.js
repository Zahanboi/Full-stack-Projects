import { Server } from "socket.io";

export const connectSocket = (server) => {
    const io = new Server(server)

    return io;
}