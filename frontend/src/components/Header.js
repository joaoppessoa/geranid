import React, { useState, useEffect } from 'react';
import '../css/cssComponets/styleHeader.css';
import { Link, useHistory } from 'react-router-dom';

function Header () {
    const history = useHistory();
    
    function logOut() {
        localStorage.clear()

        history.push('/'); 
    }

    return(
        <div className="header">
            <div className="header-menu">
                <div className="title">Ger<span>ANID</span></div>
                <ul>
                    <li><Link to="#"><i className="fas fa-search"></i></Link></li>
                    <li><Link to="#" onClick={logOut}><i className="fas fa-power-off"></i></Link></li>
                </ul>
            </div>
        </div>
    );
    
}

export default Header;