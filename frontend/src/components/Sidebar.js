import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/cssComponets/styleSidebar.css';
import api from '../services/api';

function Sidebar() {
    const [titulo, setTitulo] = useState('');
    const [workspaces, setWorkspaces] = useState([]);
    const id_session = localStorage.getItem('id_session');

    useEffect(() => {
        api.get('workspaces', {
            headers: {
                Authorization: id_session
            }
        }).then(response => {
            setWorkspaces(response.data);
        });
    }, [id_session]);

    async function handlerEdit(e) {
        e.preventDefault();

        const data = {
            titulo
        }
        //console.log(data);
        
        
        try {
            await api.put('workspaces', data, {
                headers: {Authorization: id_session}
            });

        } catch(err) {
            console.log(err);
        }
    }


    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                <center className="profile">
                    <p>
                        Áreas de Trabalho 
                    </p>

                </center>
                {workspaces.map(workspace => (
                    <li key={workspace.id} className="item" id={workspace.id}>
                        <a href={"#"+workspace.id} className="menu-btn">
                            <i className="fas fa-th-list"></i>
                            <span>
                                {workspace.titulo} 
                                <i className="fas fa-chevron-down drop-down"></i>
                            </span>
                        </a>
                        <div className="sub-menu">
                            <Link to="#">
                                <i class="fas fa-clipboard-list"></i>
                                <span>board</span>
                            </Link>
                        </div>
                    </li>
                ))}
                <li  className="item">
                    <a className="menu-btn" id='mudar'>
                    <i class="far fa-plus-square"></i>
                        <span>
                            <input 
                                type="text" 
                                placeholder="Adicionar Aréa de trabalho"
                                id="input-cad"
                            />
                        </span>
                    </a>
                        
                </li>
            </div>
        </div>
    );
}

export default Sidebar;