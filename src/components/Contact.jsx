import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
//import axios from "../api/axios";
//import {axiosPrivate} from "../api/axios";
import { Link } from 'react-router-dom';
import useRefreshToken from "../hooks/useRefreshToken";

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
            <Link to="/test">Contacts
            </Link>            
            <h2>test</h2>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>{contact.firstName} {contact.lastName}</li>
                ))}
            </ul>
            <button onClick={Test}>Refresh</button>
            <button onClick={logout}>Log out</button>
        </>
    )
};

export default Contact;