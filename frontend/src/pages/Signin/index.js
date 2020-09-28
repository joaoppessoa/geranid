import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Card, Button, Col } from 'react-bootstrap';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Form/Input';
import api from '../../services/api';

import './styles.css';

export default function Signin() {
    const formRef = useRef(null);
    const history = useHistory();

    async function hundleLogin(data, { reset }){
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                .email('Digite um E-mail válido')
                .required('Você esqueceu de digitar seu E-mail.'),
                password: Yup.string().required('Você esqueceu de digitar sua senha.')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const response = await api.post('session', data);

            localStorage.setItem('id_session', response.data.id);
            localStorage.setItem('nome_session', response.data.nome);
            localStorage.setItem('email_session', response.data.email);

            history.push('/home');
            
            reset();
        } catch (err) {
            if(err instanceof Yup.ValidationError) {
                err.errors.forEach(error => {
                    alert(error);
                });
            } else{
                alert('Falha no login, tente novamente.');
            }
            
            reset();
        }
    } 

    return (
        <div id="fundo">
            <Card id="card-log">
                <Card.Body>
                    <Card.Title id="title-card">Login</Card.Title>
                    <Form ref={formRef} onSubmit={hundleLogin}>
                        <Input label="E-mail" type="text" name="email" placeholder="E-mail" />
                        <Input label="Password" type="password" name="password" placeholder="Password" />
                        <Button variant="outline-primary" type="submit" block>Entrar</Button>
                    </Form>

                    <Col id="card-footer">
                        Não tem uma conta? <Link to='/sign-up'>Sign up</Link>
                    </Col>
                </Card.Body>
            </Card>
        </div>
    );
}