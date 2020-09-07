import React from 'react';

import '../css/styleHeader.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="header">
                <div className="header-menu">
                    <div className="title">Ger<span>ANID</span></div>
                    <ul>
                        <li><a href="#"><i className="fas fa-search"></i></a></li>
                        <li><a href="#"><i className="fas fa-power-off"></i></a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;