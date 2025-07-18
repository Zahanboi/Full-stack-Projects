import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const authCheck = (WrappedComponent) => {//passed as entire component here
    const AuthComponent = (props) => {
        const router = useNavigate();
        const [loading, setLoading] = useState(true);
        const currentPath = window.location.pathname + window.location.search;
                console.log(currentPath)
                localStorage.setItem("redirectUrl", currentPath);

        const isAuthenticated = () => {
            const token = localStorage.getItem("token");
            // Ideally, validate the token here (e.g., expiry)
            return !!token;
        };

        useEffect(() => {
            if (!isAuthenticated()) {
                
                router("/auth", { replace: true });//Replace the current entry in the history stack instead of pushing a new one so never go to /home its like doing in navigation history that user is at / then at /auth replaceing
            } else {
                setLoading(false);
            }
        }, []);

        if (loading) return null; // don't show anything until check is done

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default authCheck;
