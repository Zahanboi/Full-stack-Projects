import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { faker } from '@faker-js/faker';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [showPassword, setShowPassword] = React.useState(false);
    const [message, setMessage] = React.useState();
    let navigate = useNavigate();


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {

                let result = await handleLogin(username, password);
                console.log(result);
            }

            if (formState === 1) {

                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")

            }
        } catch (err) {

            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh', width: '100vw', display: 'flex',
                            flexDirection: 'row' }}>
                <CssBaseline />
                <Grid
                    item
                    md={7}
                    sx={{
                       backgroundImage: `url(${faker.image.urlPicsumPhotos()})`,
                       width: '50%',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: {
                        xs: 'none',  // Hide below 600px
                        sm: 'block',  // Still hidden at sm (600px)
                        md: 'block'  // Show from md (900px) and up
    }
                    }}
                    
                    
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{
                    
                width: {
                xs: '100%',  // Hide below 600px
                sm: '50%',  // Still hidden at sm (600px)
                md: '50%'  // Show from md (900px) and up
                }
                }} square>
                    <Button onClick={() => {
                    navigate("/");
                    }}>&larr; &nbsp; <strong>Back</strong></Button>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>


                        <div>
                            <Button variant={formState === 0 ? "contained" : ""} onClick={() => { setFormState(0) }}>
                                Sign In
                            </Button>
                            <Button variant={formState === 1 ? "contained" : ""} onClick={() => { setFormState(1) }}>
                                Sign Up
                            </Button>
                        </div>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {formState === 1 ? <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Full Name"
                                name="username"
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                                slotProps={{ htmlInput: { maxLength: 20 } }}
                            /> : <></>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                                slotProps={{ htmlInput: { maxLength: 20 } }}

                            />
                         <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                slotProps={{ htmlInput: { maxLength: 20 } }}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                        />
                            <p style={{ color: "red" }}>{error}</p>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login " : "Register"}
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar

                open={open}
                autoHideDuration={4000}
                message={message}
            />

        </ThemeProvider>
    );
}