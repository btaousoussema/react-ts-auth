import Button from '@mui/material/Button';
import './login.css';
import TextField from '@mui/material/TextField';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

function Login ()  {
    
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({email: "", password: "", });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', userData, {withCredentials: true  });
            console.log(response.data);
            const accessToken = response?.data?.accessToken;
            setAuth({ email: userData.email, accessToken });
            setUserData({ email: userData.email, accessToken });
            navigate("/contacts");
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="center">
            <TextField
                required
                id="outlined-required"
                label="email"
                onChange={handleChange}
                name='email'
                />
            <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                name='password'
                onChange={handleChange}
                autoComplete="current-password"
                />
                <Button variant="contained" type='submit'>Login</Button>
                <Link to="/CreateAccount">Don't have an account? Create one here
                </Link>
            </div>        
        </form>         
        </>
    )
}

export default Login