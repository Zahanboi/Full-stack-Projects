import { User } from "../models/user.model.js";
import bcrypt, {hash} from "bcrypt";
import httpStatus from "http-status";



const register = async (req, res) => {

    const {name, username, password} = req.body;
    
    try {

        const existinguser = await User.findone({ username })

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
        console.error("Error during registration:", error);
    }
}