import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/cssComponets/styleSidebar.css';
import api from '../services/api';

function Sidebar() {
    //const [titulo, setTitulo] = useState('');
    const [workspaces, setWorkspaces] = useState([]);
    const [cadWorkSp, setCadWorkSp] = useState('');
    const id_session = localStorage.getItem('id_session');
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        api.get('workspaces', {
            headers: {
                Authorization: id_session
            }
        }).then(response => {
            setWorkspaces(response.data);
        });
    }, [id_session]);

    async function handlerCadWorkspace(e) {
        e.preventDefault();

        const data = {
            titulo: cadWorkSp
        };
        try {
            const response = await api.post('workspaces', data, {
                headers: {Authorization: id_session}
            });

            setCadWorkSp('')
            
            setWorkspaces(workspaces => [...workspaces, response.data])

        } catch(err) {
            console.log(err);
            setCadWorkSp('')
        }
    }

    async function hundlerGetBoard(workspace_id) {
        await api.get(`boards/${workspace_id}`).then(response => {
            setBoards(response.data);
        });
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
                    <li key={workspace.id} className="item" id={workspace.id} >
                        <a href={"#"+workspace.id} className="menu-btn" onClick={ () => hundlerGetBoard(workspace.id)}>
                            <i className="fas fa-th-list"></i>
                            <span>
                                {workspace.titulo}
                                <i className="fas fa-chevron-down drop-down"></i>
                            </span>
                        </a>
                        <div className="sub-menu">
                            {boards.map(board => (
                                <Link to="#">
                                    <i className="fas fa-clipboard-list"></i>
                                    <span>{board.titulo}</span>
                                </Link>
                            ))}
                            
                        </div>
                    </li>
                ))}
                <li  className="item">
                    <a className="menu-btn" id='mudar'>
                    <i className="far fa-plus-square"></i>
                        <span>
                            <input 
                                type="text" 
                                placeholder="Adicionar Aréa de trabalho"
                                id="input-cad"
                                value={cadWorkSp}
                                onChange={e => setCadWorkSp(e.target.value)}
                                onBlur={handlerCadWorkspace}
                            />
                        </span>
                    </a>
                        
                </li>
            </div>
        </div>
    );
}

export default Sidebar;