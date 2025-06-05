import express from "express";
import { createServer } from "node:http";

import { connectSocket } from "./Controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import mongoose from "mongoose";

const app = express();
const server = createServer(app);   // Explicit server
const io = connectSocket(server);   // Attach Socket.IO

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }))
app.use(express.urlencoded({ limit: "40kb", extended: true  }))

app.use("/api/v1/users", userRoutes);

const startServer = async () => {

    app.set("mongo_user");
    const connectionDb = await mongoose.connect("mongodb+srv://zahansharma123:facenestpassword@cluster0.xfv3mlo.mongodb.net/");

    console.log(`Connected to MongoDB ${connectionDb.connection.host}`);
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to FaceNest API" });
    });
    server.listen(8000, () => {
        console.log("Server is running on port 8000");
    });

}

startServer();
