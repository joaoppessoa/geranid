import React, { useEffect, useState } from 'react';
import { Button, Modal, InputGroup, FormControl, Collapse,ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/cssComponets/styleSidebar.css';
import api from '../services/api';

function Sidebar() {
    //const [titulo, setTitulo] = useState('');
    
    const [smShowWorkSpace, setSmShowWorkSpace] = useState(false);
    const [smShowEditWorkSpace, setSmShowEditWorkSpace] = useState(false);
    const [smShowBoard, setSmShowBoard] = useState(false);
    const [smShowEditBoard, setSmShowEditBoard] = useState(false);

    const [workspaces, setWorkspaces] = useState([]);
    const [boards, setBoards] = useState([]);

    const [cadWorkSp, setCadWorkSp] = useState('');
    const [cadBoard, setCadBoard] = useState('');
    const [editWorkSp, setEditWorkSp] = useState('');
    const [editBoard, setEditBoard] = useState('');

    const [workspaceId, setCWorkspaceId] = useState(0);
    const [boardId, setBoardId] = useState(0);
    const [historyBoard, setHistoryBoard] = useState({});

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

    async function handlerCadWorkspace(e) {
        e.preventDefault();

        const data = {
            titulo: cadWorkSp
        };
        try {
            const response = await api.post('workspaces', data, {
                headers: {Authorization: id_session}
            });

            setCadWorkSp('');

            setSmShowWorkSpace(false);
            
            setWorkspaces(workspaces => [...workspaces, response.data]);

        } catch(err) {
            console.log(err);
            setCadWorkSp('')
        }
    }

    async function hundlerGetBoard(workspace_id) {
        await api.get(`boards/${workspace_id}`).then(response => {
            setBoards(response.data);
        });

        setCWorkspaceId(workspace_id);
    }

    async function handlerCadBoard(e) {
        e.preventDefault();

        const data = {
            titulo: cadBoard,
            descricao: ''
        }

        try {
            const response = await api.post(`boards/${workspaceId}`,
                data,
                {
                    headers: {Authorization: id_session}
                });
            
                setCadBoard('');

                setSmShowBoard(false);

                setBoards(boards => [...boards, response.data]);

        } catch(err) {
            console.log(err);
        }
    }

    function oppenWorkspace(workspace_id, workspace_title) {
        setCWorkspaceId(workspace_id);
        setEditWorkSp(workspace_title);
        setSmShowEditWorkSpace(true);
    }

    function oppenBoard(board_id, board_title) {
        setBoardId(board_id);
        setEditBoard(board_title);
        setSmShowEditBoard(true)

    }

    async function handlerEditWorkspace(e) {
        e.preventDefault();

        const data = {
            titulo: editWorkSp
        };

        try{
           
            const response = await api.put(`workspaces/${workspaceId}`, data, {
                headers: {Authorization: id_session}
            });

            await api.get('workspaces', {
                headers: {
                    Authorization: id_session
                }
            }).then(response => {
                setWorkspaces(response.data);
            });

            setEditWorkSp('');

            setSmShowEditWorkSpace(false);

            
        } catch(err) {
            console.log(err);
        }
    }

    async function handlerEditBoard(e) {
        e.preventDefault();

        const data = {
            titulo: editBoard,
            descricao: ''
        };

        try{
            const response = await api.put(`boards/${boardId}`, data);

            await api.get(`boards/${workspaceId}`).then(response => {
                setBoards(response.data);
            });

            setEditBoard('')

            setSmShowEditBoard(false);

            setHistoryBoard(response.data);

        } catch(err) {
            console.log(err);
        }
    }

    localStorage.setItem('board_id', historyBoard.id);
    localStorage.setItem('board_title', historyBoard.titulo);


    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                <center className="profile">
                    <p>
                        Áreas de Trabalho 
                    </p>

                </center>
                <li  className="item">
                <Button onClick={() => setSmShowWorkSpace(true)}>
                    <i className="fas fa-plus"></i> Nova Workspace
                </Button>
                        
                </li>
                {workspaces.map(workspace => (
                    <li key={workspace.id} className="item" id={workspace.id} >
                        <ButtonGroup aria-label="Toolbar with button groups">
                            <a 
                                href={"#"+workspace.id} 
                                className="menu-btn" 
                                onClick={ () => hundlerGetBoard(workspace.id)}
                            >
                                <i className="fas fa-th-list"></i>
                                <span>
                                    {workspace.titulo}
                                    <i clas="fas fa-pen"></i>
                                </span>
                            </a>

                            <Button 
                                variant="link" 
                                onClick={() => oppenWorkspace(workspace.id, workspace.titulo)} 
                                >
                                <i className="far fa-edit"></i>
                            </Button>
                        </ButtonGroup>
                        
                        <div className="sub-menu">
                            <Button variant="light" onClick={() => setSmShowBoard(true)}><i className="fas fa-plus"></i>Novo Board</Button>{' '}
                            {boards.map(board => (
                                <div className="sub-item" key={board.id}>
                                    <Link to="#"  onClick={() => setHistoryBoard(board)}>
                                        <i className="fas fa-clipboard-list"></i>
                                        <span>{board.titulo}</span>
                                        
                                    </Link>
                                    <a
                                        href="#"
                                        onClick={() => oppenBoard(board.id, board.titulo)}
                                    >
                                    <i className="far fa-edit"></i>
                                    </a>
                                    
                                </div>
                            ))}
                           
                        </div>
                    </li>
                ))}
                
            </div>

            <Modal
                size="sm"
                show={smShowWorkSpace}
                onHide={() => setSmShowWorkSpace(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Nova Workspace
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handlerCadWorkspace}>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Workspace"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={cadWorkSp}
                            onChange={e => setCadWorkSp(e.target.value)}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-primary" type="submit"><i className="fas fa-plus"></i></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                    
                </Modal.Body>
            </Modal>

            <Modal
                size="sm"
                show={smShowBoard}
                onHide={() => setSmShowBoard(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Novo Board
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handlerCadBoard}>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Board"
                            aria-label="Board"
                            aria-describedby="basic-addon2"
                            value={cadBoard}
                            onChange={e => setCadBoard(e.target.value)}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-primary" type="submit"><i className="fas fa-plus"></i></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                    
                </Modal.Body>
            </Modal>


            <Modal
                size="sm"
                show={smShowEditWorkSpace}
                onHide={() => setSmShowEditWorkSpace(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Workspace
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handlerEditWorkspace}>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Board"
                            aria-label="Board"
                            aria-describedby="basic-addon2"
                            value={editWorkSp}
                            onChange={e => setEditWorkSp(e.target.value)}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-primary" type="submit"><i className="fas fa-plus"></i></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                    
                </Modal.Body>
               
                </Modal>

                <Modal
                    size="sm"
                    show={smShowEditBoard}
                    onHide={() => setSmShowEditBoard(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Board
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handlerEditBoard}>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Board"
                                aria-label="Board"
                                aria-describedby="basic-addon2"
                                value={editBoard}
                                onChange={e => setEditBoard(e.target.value)}
                                />
                                <InputGroup.Append>
                                <Button variant="outline-primary" type="submit"><i className="fas fa-plus"></i></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </form>
                        
                    </Modal.Body>
                </Modal>
        </div>
    );
}

export default Sidebar;