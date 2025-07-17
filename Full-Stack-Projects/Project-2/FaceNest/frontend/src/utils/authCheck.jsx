import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const authCheck = (WrappedComponent ) => {// using HOC or higher order component
    const AuthComponent = (props) => {// This 'props' ensures that any data or functions given to AuthComponent are also available to WrappedComponent , that are coming from wrappedcomponent.
        const router = useNavigate();

        const isAuthenticated = () => {
            if(localStorage.getItem("token")) {//should also validate the token
                return true;
            } 
            return false;
        }

        useEffect(() => {
            if(!isAuthenticated()) {
                router("/auth")
            }
        }, [])

        return <WrappedComponent {...props} />
    }

    return AuthComponent;//this would be returned as the new component which will then pass all the props again to it
}

export default authCheck;