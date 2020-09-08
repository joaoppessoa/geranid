import React, { useEffect, useState } from 'react';
import imgprof from '../assets/imagem.png';
import '../css/cssComponets/styleSidebar.css';
import api from '../services/api';

function Sidebar() {
    const [titulo, setTitulo] = useState('');
    const [workspaces, setWorkspaces] = useState([]);
    const nome_session = localStorage.getItem('nome_session');
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
                    <img src={imgprof} alt="" />
                    <p>{nome_session}</p>
                </center>
                {workspaces.map(workspace => (
                    <li key={workspace.id} className="item">
                        <a href="#" className="menu-btn">
                            <i className="fas fa-th-list"></i>
                            <span>
                                <input 
                                    type="text" 
                                    defaultValue={workspace.titulo} 
                                    onChange={e => setTitulo(e.target.value)}
                                    onBlur={handlerEdit}
                                />
                            </span>
                        </a>
                    </li>
                ))}
                
            </div>
        </div>
    );
}

export default Sidebar;