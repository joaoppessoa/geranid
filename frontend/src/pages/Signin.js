import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../css/styleSignin.css';
import api from '../services/api';


function Signin () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            email,
            password
        }

        try {
            const response = await api.post('session', data);

            localStorage.setItem('id_session', response.data.id);
            localStorage.setItem('nome_session', response.data.nome);
            localStorage.setItem('email_session', response.data.email);

            history.push('/home');

            setEmail('');
            setPassword('');
        } catch (err) {
            alert('Falha no login, tente novamente.');
            setEmail('');
            setPassword('');
        }
    }
    
    return(
        <div className="body-log">
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="title">Ger<span>ANID</span></div>

                    <i className="fas fa-user-circle"></i>
                    <input 
                        className="user-input" 
                        type="text" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="E-mail" 
                        required 
                    />
                    <input 
                        className="user-input" 
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Senha" 
                        required 
                    />
            
                    <div className="option-01">
                        <Link className="link" to="#">Esqueceu sua senha?</Link>
                    </div>

                    <input className="btn" type="submit" value="LOGIN" />

                    <div className="option-02">
                        <p>Não tem registro? <Link to="/sign-up">Criar uma conta</Link></p>
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default Signin;