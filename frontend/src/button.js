import React from 'react';
import { Link } from 'react-router-dom';
const button = () =>{
    return(
        <div className="Coantainer">    
            <Link to = {'/login/redirect'}>
                    <button className = "ssobutton" type = 'submit' >SSO login</button>
            </Link>
        </div>
    )
}
export default button;