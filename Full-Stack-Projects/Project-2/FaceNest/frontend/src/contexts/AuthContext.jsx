import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import.meta.env.VITE_BACKEND_URL


export const AuthContext = createContext({});

let server = import.meta.env.VITE_BACKEND_URL;


const client = axios.create({
    baseURL: `${server}/api/v1/users`
})


export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);


    const [userData, setUserData] = useState(authContext);


    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })


            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {// sends post req to /login with data from the form of login involving username and password
                username: username,
                password: password
            });

            // console.log(username, password)
            // console.log(request.data)

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token); // did not understood
                const redirectPath = localStorage.getItem("redirectUrl") || "/";
                localStorage.removeItem("redirectUrl");
                router(redirectPath);

            }
        } catch (err) {
            throw err;
        }
    }

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }


    const data = {
        userData, setUserData, handleRegister, handleLogin , getHistoryOfUser ,addToUserHistory
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}