import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import querystring from 'querystring';
import axios from '../utils/axios';
import { logout, saveToken } from '../utils/auth';
import { useHistory } from 'react-router-dom';

const LoginCallback = () => {
    const location = useLocation();
    const query = location.search;
    const { code, state } = querystring.parse(
        query[0] === '?' ? query.slice(1) : query
    );
    const [valid, setValid] = useState(null);
    const [id, setId] = useState(null);


    const history = useHistory();
    const handleLogout = () => {
        logout();
        history.replace('/')
    }

    useEffect(() => {
        axios
            .get(`/login/callback?code=${code}&state=${state}`)
            .then(({ data }) => {
                if (data.token) {
                    saveToken(data.token);
                    setId(data.sparcs_id);
                    setValid(true);
                } else {
                    setValid(false);
                }
            });
    }, []);

    if (valid === null) return <div> Loading </div>;
    else if (valid) return(
        <div> 
            HI, {id}!  
            <button onClick = {handleLogout}>Logout</button>
        </div>);
    else return <Redirect to="/" />
}

export default LoginCallback;