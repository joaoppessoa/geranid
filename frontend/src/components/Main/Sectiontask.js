import React, { useEffect, useState, useRef } from 'react';
import { Table, FormControl, Button, Modal} from 'react-bootstrap';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import  Input from '../Form/Input';
import Prioridade from '../Form/Prioridade';
import api from '../../services/api';

export default function Sectiontask({ group }) {
    const [tasks, setTasks] = useState([]);

    const [smShowTask, setSmShowTask] = useState(false);

    const formRef = useRef(null);
    const formTitleRef = useRef(null);
    const formPrioridadeRef = useRef(null);

    useEffect(() => {
        api.get(`tasks/${group}`).then(response => {
            setTasks(response.data);
        });
    }, [group]);

    async function hundleSubmit(data, { reset }){
        try{
            const schema = Yup.object().shape({
                titulo: Yup.string().required('Digite um titulo para a Tarefa.')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const response = await api.post(`tasks/${group}`, data);

            setTasks(tasks => [...tasks, response.data]);

            reset();

            setSmShowTask(false);
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

    async function hundleEditTitle(data) {
        const request = {
            titulo: data.titulo
        };

        try{
            await api.put(`tasks/title/${data.id}`, request);

            await api.get(`tasks/${group}`).then(response => {
                setTasks(response.data);
            });
        } catch(err){
            alert('Erro, tente novamente.');
        }
    }

    return(
        <div>
            <Button variant="primary" onClick={() => setSmShowTask(true)}><i className="fas fa-plus-circle"></i> Nova Tarefa</Button>
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
                        <td></td>
                        <td>
                            <Form initialData={task} ref={formTitleRef} onSubmit={hundleEditTitle}>
                                <Input label="" type="text" name="titulo" />
                                <Input label="" type="hidden" name="id" />
                            </Form>
                        </td>
                        <td>João Paulo dos Santos</td>
                        <td>
                            <Form initialData={task}>
                                <Prioridade name="prioridade" ></Prioridade>
                            </Form>
                        </td>
                        <td>
                            <FormControl
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
                            </FormControl>
                        </td>
                        <td><FormControl type="date" value={task.data} /></td>
                        <td></td>
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
                    Novo Board
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef} onSubmit={hundleSubmit}> 
                        <Input label="" type="text" name="titulo" placeholder="Digite um titulo." />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}