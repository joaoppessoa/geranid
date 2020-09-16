import React, { useState, useEffect } from 'react';
import '../css/cssComponets/styleHeader.css';
import { Link, useHistory } from 'react-router-dom';

function Header () {
    const history = useHistory();
    const nome_session = localStorage.getItem('nome_session');
    
    function logOut() {
        localStorage.clear()

        history.push('/'); 
    }

    return(
        <div className="header">
            <div className="header-menu">
                <div className='user'>
                <i class="far fa-user"></i>
                    {nome_session}
                </div>
                <div className="title">GEREN<span>CIADOR</span></div>
                <ul>
                    <li><Link to="#" onClick={logOut}><i className="fas fa-power-off"></i></Link></li>
                </ul>
            </div>
        </div>
    );
    
}

export default Header;