import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Card, Button, Col } from 'react-bootstrap';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Form/Input';
import api from '../../services/api';

import './styles.css';


export default function Signup() {
    const formRef = useRef(null);
    const history = useHistory();

    async function hundleSubmit(data, { reset }) {
        try {
            const schema = Yup.object().shape({
                nome: Yup.string().required('O nome é um campo obrigatório.'),
                email: Yup.string()
                    .email('Digite um E-mail válido.')
                    .required('O E-mail é um campo obrigatório.'),
                password: Yup.string().required('O Password é um campo obrigatório.')
            }); 

            console.log(schema);

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('users', data);

            alert('Cadastro realizado com sucesso.');

            reset();

            history.push('/');
        } catch(err) {
            if(err instanceof Yup.ValidationError) {
                err.errors.forEach(error => {
                    alert(error);
                })
            } else{
                alert('Erro ao realizar o cadastro.');
            }
            reset();
        }
    }

    return(
        <div id="fundo">
            <Card id="card-log">
                <Card.Body>
                    <Card.Title id="title-card">Sign Up</Card.Title>
                    <Form ref={formRef} onSubmit={hundleSubmit} >
                        <Input label="Nome" type="text" name="nome" placeholder="Digite seu nome aqui." />
                        <Input label="E-mail" type="text" name="email" placeholder="Digite seu e-mail aqui." />
                        <Input label="Password" type="password" name="password" placeholder="Crie uma Password." />
                        <Button variant="outline-primary" type="submit" block>Cadastrar</Button>
                    </Form>

                    <Col id="card-footer">
                        Já tem uma conta? <Link to='/sign-in'>Login</Link>
                    </Col>
                </Card.Body>
            </Card>
        </div>
    );
}