import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { generateMeetingCode } from "../utils/meetingCode"

export default function LandingPage() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  let Code = generateMeetingCode();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="landingPageContainer">
      <nav>
        <h2>FaceNest</h2>
        <div className="navlist">
          {/* <button onClick={() => navigate(`/meet/${Code}`)}>Join as Guest</button> */}

          {!isLoggedIn ? (
            <>
              <button onClick={() => navigate("/auth")}>Register</button>
              <button onClick={() => navigate("/auth")}>Login</button>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="leftContent">
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones
          </h1>
          <p>Cover a distance with FaceNest</p>
          <Link to="/home" className="cta-button">Get Started</Link>
        </div>

        <div className="rightImage">
          <img src="/mobile.png" alt="Mobile Illustration" />
        </div>
      </div>
    </div>
  );
}
