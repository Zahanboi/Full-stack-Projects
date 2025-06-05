import { Server } from "socket.io";

let connections = {};
let messages = {}; //contains a array of objects path: [{data: "hello", sender: "user1", time: "12:00"} , ....]
let timeOnline = {};

export const connectSocket = (server) => {
    const io = new Server(server , {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection" , (socket) => {
    console.log("New client connected: " + socket.id);
    
    socket.on("join-call", (path) => {
        if (connections[path] === undefined) {
            connections[path] = [];
        }

        connections[path].push(socket.id);
        //emit to each client via socket.id
        //timeinput
        timeOnline[socket.id] = new Date();

        connections[path].forEach(elem => {
            io.to(elem).emit("user-joined", socket.id , connections[path]); // here we need to run a loop through a array containing socket ids but can use socket.join to avoid loop method
        }); 

        if (messages[path] !== undefined ) { //emit prev messages if exist to newly joined user 
            messages[path].forEach(elem => {
            io.to(socket.id).emit("chat-message", messages[path][elem]['data']); // here we need to run a loop through a array containing socket ids but can use socket.join to avoid loop method
        }); 
        }

    })

    socket.on("signal" , (toId, message) => {
        io.to(toId).emit("signal", socket.id, message);// send signal or a specific message to a specific user
    })

    socket.on("chat-message", (data, sender) => {
         const [matchingRoom, found] = Object.entries(connections) // turns object into an array of key-value pairs like [key1 , [value1, value2]] in connection wala
                .reduce(([room, isFound], [roomKey, roomValue]) => { // reduce the array to find the room and roomValue where socket.id matches the socketid who has send the message so socketid is present in that room
 
                    if (!isFound && roomValue.includes(socket.id)) {//true && ..
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);//initial value

            if (found === true) {// uss room m jitte log h sbko message bhejdo
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({
                     'sender': sender,
                     "data": data, 
                     "socket-id-sender": socket.id 
                    })

                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }
    })


    socket.on("disconnect", () => {

        var diffTime = Math.abs(timeOnline[socket.id] - new Date());

        var key;
        //delete the socket id from connections
        //if connnections[path] is empty then delete the path from connections

        // for (key in connections) {
        //     if (connections[key].includes(socket.id)) {
        //         connections[key] = connections[key].filter(id => id !== socket.id);
        //         if (connections[key].length === 0) {
        //             delete connections[key];
        //         }
        //         break;
        //     }
        // }

                    for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k // jis room m socket.id hai uska key mil gaya

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)


                        if (connections[key].length === 0) {
                            delete connections[key]
                        }
                    }
                }

            }


    })
})
    return io;
}