import React, { useEffect, useState } from 'react';
import { Col, Table, FormControl, Form, Button, Modal, InputGroup } from 'react-bootstrap';
import api from '../../services/api';

function Tasktable(props) {
    const [smShowTask, setSmShowTask] = useState(false);
    const [smShowTitulo, setSmShowTitulo] = useState(false);
    const [tasks, setTasks] = useState([]);

    const [tituloTask, setTituloTesk] = useState('');
    const [editTituloTask, setEditTitulotask]  = useState('');
    const [editPrioridadeTask, setEditPrioridadetask]  = useState('');
    const [editStatusTask, setEditStatustask]  = useState('');
    const [editDataTask, setEditDatatask]  = useState('');

    const [task_id, setTaskId] = useState(0);
    
    useEffect(() => {
        api.get(`tasks/${props.group.id}`).then(response => {
            setTasks(response.data);
        });
    }, [props.group.id]);

    function targetTitle(task_id, titulo){
        setSmShowTitulo(true)
        setTaskId(task_id)
        setEditTitulotask(titulo)
    }

    async function hundlerCadTask(e){
        e.preventDefault();

        const data = {
            titulo: tituloTask,
        };

        try{
            const response = await api.post(`tasks/${props.group.id}`,data);

            await api.get(`tasks/${props.group.id}`).then(response => {
                setTasks(response.data);
            });

            setTituloTesk('');
            setSmShowTask(false);

        } catch(err) {
            console.log(err);
        }
    }

    async function hundlerEditTitle(e) {
        e.preventDefault()
        const data = {
            titulo: editTituloTask,
        }

        try{
            await api.put(`tasks/title/${task_id}`, data);

            await api.get(`tasks/${props.group.id}`).then(response => {
                setTasks(response.data);
            });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Col>
            <Button onClick={() => setSmShowTask(true)}>
                <i className="fas fa-plus"></i> Nova Task
            </Button>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th className="color"></th>
                    <th>DEMANDAS</th>
                    <th>Responsavel</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>*</th>
                    <th>*</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                        <td className="color"></td>
                        <td>
                            <a href="#" onClick={() => setEditTitulotask(task.id, task.titulo)}>{task.titulo}</a>
                        </td>
                        <td>João Pedro</td>
                        <td>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                            >
                                <option value="0">Choose...</option>
                                <option value="1" selected={task.prioridade === 1 ? 'selected': ''}>Pequena</option>
                                <option value="2" selected={task.prioridade === 2 ? 'selected': ''}>Média</option>
                                <option value="3" selected={task.prioridade === 3 ? 'selected': ''}>Alta</option>
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                            >
                                <option value="0">Choose...</option>
                                <option value="2" selected={task.status === 2 ? 'selected': ''}>Parado</option>
                                <option value="3" selected={task.status === 3 ? 'selected': ''}>Em Andamento</option>
                                <option value="4" selected={task.status === 4 ? 'selected': ''}>Aguardando revisão</option>
                                <option value="1" selected={task.status === 1 ? 'selected': ''}>Feito</option>
                            </Form.Control>
                        </td>
                        <td><FormControl type="date" value={task.data} /></td>
                        <td><Button variant="outline-primary">Primary</Button></td>
                        <td></td>
                        </tr>
                    ))}
                    
                    
                </tbody>
            </Table>

            <Modal
                size="sm"
                show={smShowTask}
                onHide={() => setSmShowTask(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Nova Workspace
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={hundlerCadTask}>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Titulo da Task"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={tituloTask}
                            onChange={e => setTituloTesk(e.target.value)}
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
                show={smShowTitulo}
                onHide={() => setSmShowTitulo(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Titulo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={hundlerEditTitle}>
                        <InputGroup className="mb-3">
                            <input
                            placeholder="Titulo da Task"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={editTituloTask}
                            onChange={e => setEditTitulotask(e.target.value)}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-primary" type="submit"><i className="fas fa-plus"></i></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                </Modal.Body>
            </Modal>
        </Col>
    )
}

export default Tasktable