import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from 'react-router-dom';
import useRefreshToken from "../hooks/useRefreshToken";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const refresh = useRefreshToken();

    
    const Test = async () => {
            const resp = await refresh();
            console.log("Current contacts state: ", contacts);
    }

    const logout = async () => {
        try {
            await axiosPrivate.post('/auth/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getContacts = async () => {
            try {
                const response = await axiosPrivate.get('/contacts', {
                    signal: controller.signal
                });

                console.log(response.data);
                isMounted && setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };
        getContacts();
        console.log("useEffect ran, fetching contacts...");
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);


    return (
        <>
        <div style={{ padding: "20px", display:"flex", flexDirection:"column", alignItems: "center", justifyContent: "flex-start", height: "100vh" }}>
            <TableContainer component={Paper}/*</div> style={{ display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center" }}*/ 
            >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Firstname</TableCell>
                    <TableCell>Lastname</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {contacts.map((contact) => (
                    <TableRow
                    key={contact.id}>
                        <TableCell>{contact.firstName}</TableCell>
                        <TableCell>{contact.lastName}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Button onClick={logout} style={{ marginTop: "20px" }}>Log out</Button>    
        </div>
        </>
    )
};

export default Contact;