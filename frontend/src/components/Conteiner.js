import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Collapse, InputGroup, FormControl, Form } from 'react-bootstrap'
import Taskstable from './subcomponents/Taskstable';
import '../css/cssComponets/styleContainer.css';
import api from '../services/api';

function Conteiner() {

    const [groups, setGroups] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [openFormCadGroup, setOpenFormCadGroup] = useState(false);
    const [openFormCadTask, setOpenFormCadTask] = useState(false);
    const [groupTitle, setGroupTitle] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [groupId, setGroupId] = useState(0);
    
    useEffect(() => {
        api.get(`groups/${localStorage.getItem('board_id')}`).then(response => {
            setGroups(response.data);
        });
    }, [localStorage.getItem('board_id')]);

    function setTaskDatas(titulo, groupId) {
        setTaskTitle(titulo);
        setGroupId(groupId);
    }

    async function hundleCreateGroup(e) {
        e.preventDefault();

        const data = {
            titulo: groupTitle,
            cor: ''
        };

        try {
            const response = await api.post(`groups/${localStorage.getItem('board_id')}`, data);

            setGroupTitle('')

            setOpenFormCadGroup(false);

            setGroups(groups => [...groups, response.data]);
        } catch(err) {
            console.log(err);
        }
    }

    async function hundleCreateTask(e) {
        e.preventDefault();

        const data = {
            titulo: taskTitle
        };

        try {
            await api.post(`tasks/${groupId}`, data);

            await api.get(`tasks/${groupId}`).then(response => {
                setTasks(response.data);
            });

            setTaskTitle('');
            setOpenFormCadTask(false);
        } catch(err){
            console.log(err);
        }
    }

    return(
        <Container>
            <Row className="title-board">
                <Col>
                    <h3>
                        {localStorage.getItem('board_title')} 
                        <Button 
                                variant="link" 
                                onClick={() => setOpenFormCadGroup(!openFormCadGroup)}
                                aria-expanded={openFormCadGroup}
                        >
                            <i className="fas fa-plus-square"> Novo Grupo </i>
                        </Button>
                    </h3>

                    
                    <Collapse in={openFormCadGroup}>
                            <div id="example-collapse-text">
                                <form onSubmit={hundleCreateGroup} >
                                    <Col md="6">
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Novo Grupo"
                                                value={groupTitle}
                                                onChange={e => setGroupTitle(e.target.value)}
                                            />
                                            <InputGroup.Append>
                                            <Button type="submit"><i className="far fa-plus-square"></i></Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>    
                                
                                </form>
                            </div>
                    </Collapse>
                </Col>
            </Row>
            {groups.map( group => (
                <div  key={group.id}>
                    <Row className="title-group">
                        <Col>
                            <h5>
                                {group.titulo} 
                                <span><i className="fas fa-edit"></i></span>
                            </h5>
                        </Col>

                        <Col>
                            <Button 
                                variant="link" 
                                onClick={() => setOpenFormCadTask(!openFormCadTask)}
                                aria-expanded={openFormCadTask}
                            >
                                <i className="fas fa-plus-square"> Novo Grupo </i>
                            </Button>
                        </Col>
                        
                    </Row>
                        <Collapse in={openFormCadTask}>
                                <div id="example-collapse-text">
                                    <Col md="11">
                                        <Form onSubmit={hundleCreateTask}>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="Novo Grupo"
                                                    value={taskTitle}
                                                    onChange={e => setTaskDatas(e.target.value, group.id)}
                                                />
                                                <InputGroup.Append>
                                                <Button type="submit"><i className="far fa-plus-square"></i></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form>
                                    </Col>
                                    
                                </div>
                        </Collapse>
                    
                    <Row className="tasks">
                        <Taskstable group={group} />
                    </Row>
                </div>
            ))}
            
        </Container>
    )
}

export default Conteiner;