import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import {Link, useNavigate} from 'react-router-dom';

function NavigationBar() {

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/Login");
    };
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button onClick={goToLogin} color="inherit"> Login </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationBar;
