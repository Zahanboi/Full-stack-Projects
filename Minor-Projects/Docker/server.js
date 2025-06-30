import express from "express";
import path from 'path';
import dotenv from 'dotenv'
dotenv.config()
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // have to import for type module because __dirname is not available in ES modules

const app = express();
import { createServer } from "node:http";
// import { strict } from "node:assert";

const server = createServer(app);
const port = 6969;
app.use(express.json({ limit: "40kb" }))
app.use(express.urlencoded({ limit: "40kb", extended: true  }));

main()
async function main(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

const User = mongoose.model('User', new mongoose.Schema({} , {strict: false }), 'sample_db' ); // strict: false allows for flexible scheme and you need to set the username as admin for the databse "users" of this collection to make this work other wise it will create a collection in the database with the name 'sample_db' in db where the specified username  is admin

app.get("/", (req, res) => {
    // res.json({ message: "Hello, World!" })
     res.sendFile(path.join(__dirname, 'index.html')); //__dirname is used to get the directory name of the current module mtlb docker folder tak ka address uske aage we can add via path.join
    
});

app.get("/getusers", async (req, res) => {
    const user = await User.find({});// or can use mongo db client provider where specify db and  collection name
    res.json({ Users: user });
})

app.post("/adduser", (req, res) => {
    const { Email , username } = req.body;
    const newUser = new User({ Email, username });
    newUser.save()
        .then(() => {
            console.log(`User ${username} added successfully!`);
        })
        .catch(err => {
            console.error("Error adding user:", err);
        });
        
        res.redirect("/getusers"); 
    // console.log(`User added: ${name}`);
    // res.json({ message: `User ${name} added successfully!` });//dont send any res here as post req dis
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})