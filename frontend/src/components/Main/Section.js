import React, { useState, useEffect, useRef } from 'react';
import { Col, Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { Form } from '@unform/web'; 
import Input from '../Form/Input';
import Sectiontask from './Sectiontask';
import api from '../../services/api';

export default function Section({ board }) {
    const [groups, setGroups] = useState([]);

    const [smShowGroup, setSmShowGroup] = useState(false);
    const [smShowEditGroup, setSmShowEditGroup] = useState(false);

    const [group, setGroup] = useState({});

    const formRef = useRef(null);
    const formEditRef = useRef(null);
    
    useEffect(() => {
        api.get(`groups/${board}`).then(response => {
            setGroups(response.data);
        });
    }, [board]);

    function oppenGroup(group) {
        setGroup(group);
        setSmShowEditGroup(true);
    }

    async function hundleSubmit(data, { reset }){ 
        try {
            const schema = Yup.object().shape({
                titulo: Yup.string().required('Digite um titulo para seu Grupo.')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            const response = await api.post(`groups/${board}`, data);

            setGroups(groups => [...groups, response.data]);

            reset();

            setSmShowGroup(false);
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
            cor: data.cor
        };

        try {
            await api.put(`groups/${data.id}`, request);

            await api.get(`groups/${board}`).then(response => {
                setGroups(response.data);
            });

            setSmShowEditGroup(false);

        } catch(err) {
            alert('Erro, tente novamente.');
        }
    }

    return(
        <Col>
            <Button variant="primary" onClick={() => setSmShowGroup(true)} ><i className="fas fa-plus-circle"></i> Novo Grupo </Button>
            {groups.map(group => (
                <Col key={group.id}>
                    <Col><h4>{group.titulo} <Button variant="link" onClick={() => oppenGroup(group)}><i className="fas fa-edit"></i></Button></h4></Col>
                    <Sectiontask group={group.id} />
                </Col>
            ))}

            <Modal
                size="sm"
                show={smShowGroup}
                onHide={() => setSmShowGroup(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Novo Grupo
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
                show={smShowEditGroup}
                onHide={() => setSmShowEditGroup(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Board
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formEditRef} initialData={group} onSubmit={hundleEditSubmit} >
                        <Input label="" type="text" name="titulo" placeholder="Digite um titulo." />
                        <Input label="" type="hidden" name="id" placeholder="" />
                        <Input label="" type="hidden" name="cor" placeholder="" />
                    </Form>
                </Modal.Body>
            </Modal>
        </Col>
    );
}