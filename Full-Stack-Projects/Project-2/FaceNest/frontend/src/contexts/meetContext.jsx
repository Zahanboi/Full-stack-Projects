import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoMeetComponent from "../pages/VideoMeet"; 
import.meta.env.VITE_BACKEND_URL

export default function MeetGuardedRoute() {
  const { url } = useParams();
  const [isValid, setIsValid] = useState(null); // null = loading
  let routeTo = useNavigate();
  useEffect(() => {
    async function checkRoom() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${url}`, {
                params: {
                    token: localStorage.getItem("token")
                }
            });
        setIsValid(res.data.valid); 
      } catch (err) {
        setIsValid(false);
      }
    }

    checkRoom();
  }, [url]);

  if (isValid === null) return <div>Checking room validity...</div>;
  if (!isValid){ 
    routeTo("/")
    alert("Invalid or expired meeting link.");//change in future to something better
    return 
  } 

  return <VideoMeetComponent />;
}
