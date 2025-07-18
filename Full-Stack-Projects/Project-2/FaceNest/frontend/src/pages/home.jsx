import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RestoreIcon from '@mui/icons-material/Restore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { AuthContext } from '../contexts/AuthContext';
import authCheck from '../utils/authCheck';
import { generateMeetingCode } from "../utils/meetingCode";
import.meta.env.VITE_FRONTEND_URL
import '../styles/HomePage.css';

function HomeComponent() {
  const navigate = useNavigate();
  const { addToUserHistory } = useContext(AuthContext);

  const [meetingCode, setMeetingCode] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const SERVER_URL = import.meta.env.VITE_FRONTEND_URL;

  const generateCode = async () => {
    
    const Code = generateMeetingCode();
    let res = await addToUserHistory(Code);//keep this to make sure first code saves and then generated for user otherwise can cause error if try to join fast before saving (not keeping in try and catch then this trick wont work await is trated by try and rest code is executed as it is not in order)
    setMeetingCode(Code);
    console.log(res.status);
  };

  const handleJoinVideoCall = () => {
    if (!meetingCode) return;
    navigate(`/meet/${meetingCode}`);
  };

  const copyToClipboard = () => {
    const fullUrl = `${SERVER_URL}/meet/${meetingCode}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setSnackbarOpen(true);
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <>
      <nav className="home-navbar">
        <div className="home-navbar__logo">
          <h2 onClick={() => {
              navigate("/");
            }} >FaceNest</h2>
        </div>

        <div className="home-navbar__actions">
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
            <span className="home-navbar__history-label">History</span>
          </IconButton>

          <Button
            className="home-navbar__logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </nav>

      <main className="home-meet">
        <section className="home-meet__left">
          <h1 className="home-meet__title">Video calls and meetings for everyone</h1>
          <p className="home-meet__subtitle">
            Connect, collaborate, and celebrate from anywhere with FaceNest.
          </p>

          <div className="home-meet__controls">
            <Button
              variant="contained"
              className="home-btn home-btn--generate"
              onClick={generateCode}
            >
              New Meeting
            </Button>

            <div className="home-meet__join">
              <input
                type="text"
                placeholder="Enter a code"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                maxLength={19}
              />
              <Button
                variant="outlined"
                onClick={handleJoinVideoCall}
                disabled={!meetingCode}
              >
                Join
              </Button>
            </div>
          </div>

          {meetingCode && (
            <div className="home-meet__link">
              <span>
                Meeting Link: <strong>{`${SERVER_URL}/meet/${meetingCode}`}</strong>
              </span>
              <IconButton onClick={copyToClipboard} title="Copy to clipboard">
                <ContentCopyIcon />
              </IconButton>
            </div>
          )}
        </section>

        <section className="home-meet__right">
          <img src="/meet.png" alt="Meeting Illustration" />
          <p className="home-meet__info">
            <strong>Get a link you can share</strong><br />
            Click “New Meeting” to get a link you can send to people you want to meet with.
          </p>
        </section>
      </main>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Meeting link copied to clipboard!"
        action={
          <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

export default authCheck(HomeComponent);
