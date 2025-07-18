import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Box,
  CardContent,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import authCheck from '../utils/authCheck';

 function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {
        // IMPLEMENT SNACKBAR
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
  <IconButton
    onClick={() => routeTo("/home")}
    sx={{
      backgroundColor: "#1976d2",
      color: "white",
      padding: "10px",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      '&:hover': {
        backgroundColor: "#1565c0",
        transform: "scale(1.05)"
      }
    }}
  >
    <HomeIcon />
  </IconButton>

  <Typography
    variant="button"
    onClick={() => routeTo("/home")}
    sx={{
      marginLeft: "12px",
      cursor: "pointer",
      color: "#1976d2",
      fontWeight: "bold",
      transition: "color 0.3s ease",
      margin: "2rem",
      '&:hover': {
        color: "#0d47a1"
      }
    }}
  >
    Back to Home
  </Typography>
  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Your Meeting History
        </Typography>
</Box>


      {meetings.length > 0 ? (
        meetings.map((e, i) => (
          <Card
            key={i}
            variant="outlined"
            sx={{
              marginBottom: '1rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '1rem',
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Meeting Code
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {e.meetingCode}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2" color="text.secondary">
                Date
              </Typography>
              <Typography variant="body1">{formatDate(e.date)}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No meetings found.
        </Typography>
      )}
    </Box>
  );
}

export default authCheck(History)