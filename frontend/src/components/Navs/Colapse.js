import React, { useEffect, useState, useRef } from 'react';
import { Collapse, ListGroup, Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import  Input from '../Form/Input';
import api from '../../services/api';

import './style.css'

export default function Colapse({ workspace, condicao, callbackParent, id_session }) {
    const [boards, setBoards] = useState([]);
    const formRef = useRef(null);
    const formEditRef = useRef(null);

    const [smShowBoard, setSmShowBoard] = useState(false);
    const [smShowEditBoard, setSmShowEditBoard] = useState(false);

    const [board, setBoard] = useState({});

    useEffect(() => {
        api.get(`boards/${workspace}`).then(response => {
            setBoards(response.data);
        })
    }, [workspace]);

    function oppenBoard(board) {
        setBoard(board);
        setSmShowEditBoard(true);
    }

    async function hundleSubmit(data, { reset }) {
        try{
            const schema = Yup.object().shape({
                titulo: Yup.string().required('Digite um titulo para seu Board.')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const response = await api.post(`boards/${workspace}`,
                data,
                {
                    headers: {Authorization: id_session}
                });

            setBoards(boards => [...boards, response.data]);

            reset();

            setSmShowBoard(false);
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
            titulo: data.titulo,
            descricao: data.descricao
        }

        try {
            await api.put(`boards/${data.id}`, request);

            await api.get(`boards/${workspace}`).then(response => {
                setBoards(response.data);
            });

            setSmShowEditBoard(false)
        } catch(err) {
            alert('Erro, tente novamente.');

        }
    }

    return(
        <div>
            <Collapse in={condicao}>
                <ListGroup >
                    <ListGroup.Item>
                        <Button variant="outline-secondary" onClick={() => setSmShowBoard(true)} block><i className="fas fa-plus"></i>Novo Board</Button>
                    </ListGroup.Item>
                {boards.map(board => (
                    <ListGroup.Item className="bord-title" key={board.id} >
                        <a 
                            href={`#${board.id}`} 
                            onClick={() => callbackParent(board.id, board.titulo)} 
                        >
                        <i className="fas fa-angle-right"></i>  {board.titulo}
                        </a>

                        <Button variant="link"
                            href="#"
                            onClick={() => oppenBoard(board)}
                        >
                            <i className="far fa-edit"></i>
                        </Button>
                    </ListGroup.Item>
                ))}
                </ListGroup>

            </Collapse>

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
                    <Form ref={formRef} onSubmit={hundleSubmit}> 
                        <Input label="" type="text" name="titulo" placeholder="Digite um titulo." />
                    </Form>
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
                    <Form ref={formEditRef} initialData={board} onSubmit={hundleEditSubmit} >
                        <Input label="" type="text" name="titulo" placeholder="Digite um titulo." />
                        <Input label="" type="hidden" name="id" placeholder="" />
                        <Input label="" type="hidden" name="descricao" placeholder="" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
        
    );
}