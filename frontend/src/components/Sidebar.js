import React from 'react';
import imgprof from '../assets/imagem.png';
import '../css/cssComponets/styleSidebar.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-menu">
                    <center class="profile">
                        <img src={imgprof} alt="" />
                        <p>João Paulo</p>
                    </center>
                    <li className="item">
                        <a href="#" className="menu-btn">
                            <i className="fas fa-th-list"></i>
                            <span>Workspace</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" className="menu-btn">
                            <i className="fas fa-th-list"></i>
                            <span>Workspace</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" className="menu-btn">
                            <i className="fas fa-th-list"></i>
                            <span>Workspace</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" className="menu-btn">
                            <i className="fas fa-th-list"></i>
                            <span>Workspace</span>
                        </a>
                    </li>
                </div>
            </div>
        );
    }
}

export default Sidebar;