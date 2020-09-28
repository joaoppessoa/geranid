import React, { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { Row, Col, Button, Nav, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import Colapse from '../../components/Navs/Colapse';
import Header from '../../components/Main/Header';
import Section from '../../components/Main/Section';
import { Form } from '@unform/web';
import  Input from '../../components/Form/Input';
import api from '../../services/api';

import './styles.css';

export default function Home() {
    const id_session = localStorage.getItem('id_session');

    const [open, setOpen] = useState(false);
    const [smShowWorkSpace, setSmShowWorkSpace] = useState(false);
    const [smShowEditWorkSpace, setSmShowEditWorkSpace] = useState(false);

    const [workspaces, setWorkspaces] = useState([]);
    const [board, setBoard] = useState(0);
    const [baordTitle, setBoardTitle] = useState('Bem vindo');
    const [editWorkSp, setEditWorkSp] = useState({});

    const history = useHistory();
    const formRef = useRef(null);
    const formeditref = useRef(null);

    useEffect(() => {
        api.get('workspaces', {
            headers: {
                Authorization: localStorage.getItem('id_session')
            }
        }).then(response => {
            setWorkspaces(response.data);
        });
    }, [localStorage.getItem('id_session')]);

    function hundleGetBoardId(boardId, baordTitle){
        setBoard(boardId);
        setBoardTitle(baordTitle);
    }

    function oppenWorkspace(workspace) {
        setEditWorkSp(workspace);
        setSmShowEditWorkSpace(true);
    }
    
    function logOut() {
        localStorage.clear()

        history.push('/'); 
    }

    async function hundleSubmit(data, { reset }) {
        try {
            const schema = Yup.object().shape({
                titulo: Yup.string()
                    .required('Digite um titulo para sua workspace.')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const response = await api.post('workspaces', data, {
                headers: {Authorization: id_session}
            });

            setWorkspaces(workspaces => [...workspaces, response.data]);

            reset();

            setSmShowWorkSpace(false);
        } catch(err) {
            if(err instanceof Yup.ValidationError) {
                err.errors.forEach(error => {
                    alert(error);
                });
            } else{
                alert('Erro, tente novamente.');

                reset();
            }
        }
    }

    async function hundleEditSubmit(data, { reset }) {
        const request = {
            titulo: data.titulo
        }

        try{
            await api.put(`workspaces/${data.id}`, request, {
                headers: {Authorization: id_session}
            });

            await api.get('workspaces', {
                headers: {
                    Authorization: id_session
                }
            }).then(response => {
                setWorkspaces(response.data);
            });

            reset();
        } catch(err) {
            alert('Erro, tente novamente.');

            reset();
        }
    }

    return(
        <div>
            <div id="header">
                <Row>
                    <Col>
                        <Col className="header">
                            <div id="icon">
                                <i className="fas fa-user-circle"></i>
                                <span>{localStorage.getItem('nome_session')}</span>
                            </div>
                        </Col>
                    </Col>

                    <Col xs={6} id="app-name" >
                        GEREN<span>CIADOR</span>
                    </Col>

                    <Col >
                        <div id="button">
                            <Button variant="link" onClick={logOut}><i className="fas fa-power-off"></i></Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className="worksp">
                        <Nav variant="tabs" defaultActiveKey="/home" className="flex-column">
                            <Nav.Item>
                                <Button onClick={() => setSmShowWorkSpace(true)} variant="outline-primary" block>
                                    <i className="fas fa-plus"></i> Nova Workspace
                                </Button>
                            </Nav.Item>
                            {workspaces.map(workspace => (
                                <Nav.Item key={workspace.id}>
                                     <Nav.Link 
                                     key={workspace.id} 
                                     eventKey={`link-${workspace.id}`}
                                     onClick={() => setOpen(!open)}
                                     className='ws-list'
                                     >
                                        <h6><i className="fas fa-th-list"></i> {workspace.titulo}</h6> 
                                    </Nav.Link>
                                    <Button 
                                        variant="link" 
                                        onClick={() => oppenWorkspace(workspace)} 
                                        >
                                        <i className="far fa-edit"></i>
                                    </Button>
                                     <Colapse 
                                        workspace={workspace.id} 
                                        condicao={true} 
                                        callbackParent={(boardId, boardTitle) => hundleGetBoardId(boardId, boardTitle)} 
                                        id_session={id_session}
                                    />

                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>

                    <Col md={10}>
                       <Header title={baordTitle} />
                       <Section board={board} />
                    </Col>
                </Row>

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
                        <Form ref={formRef} onSubmit={hundleSubmit}> 
                            <Input label="" type="text" name="titulo" placeholder="Digite um titulo." />
                        </Form>
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
                        <Form initialData={editWorkSp} ref={formeditref} onSubmit={hundleEditSubmit}> 
                            <Input label="" type="text" name="titulo" placeholder="Digite um titulo." />
                            <Input label="" type="hidden" name="id" placeholder="" />
                        </Form>
                    </Modal.Body>
                
                </Modal>
            </div>
            
        </div>
    );    
}