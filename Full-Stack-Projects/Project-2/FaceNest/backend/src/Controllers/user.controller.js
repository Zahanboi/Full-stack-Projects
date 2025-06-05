import { User } from "../models/user.model.js";
import bcrypt, {hash} from "bcrypt";
import httpStatus from "http-status";
import crypto from "crypto"

const login = async (req, res) => {

    const {username, password} = req.body;

    try {
        
        const user = await User.findOne({ userName: username }); //write like this  {userName: username} instead of just { username } to avoid confusion with mongoose and specifically search for username as in model name define as userName no just username
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({message: "User not found"});
        }

        let isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({token: token})

        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or password" })
        }

    } catch (error) {
        res.json({message: "Error logging in", error: error.message});
    }
}


const register = async (req, res) => {

    const {name, username, password} = req.body;
    
    try {

        const existinguser = await User.findOne({ userName: username })

        if (existinguser){
            return res.status(httpStatus.FOUND).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            userName: username,
            password: hashedPassword
        })

        await newUser.save();
        res.status(httpStatus.CREATED).json({message: "User registered successfully"});
        

    } catch (error) {
        res.json({message: "Error registering user", error: error.message});
    }
}

export { login, register };