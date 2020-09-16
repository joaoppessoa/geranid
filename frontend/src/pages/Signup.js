import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../services/api';
import '../css/styleSign.css';

function Signup() {
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusNome, setFocusNome] = useState('');
    const [focusEmail, setFocusEmail] = useState('');
    const [focusPass, setFocusPass] = useState('');

    const history = useHistory();

    async function hundleSubmit(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            password
        }

        try {
            await api.post('users', data);

            alert('Cadastro realizado com sucesso.');

            setNome('');
            setEmail('');
            setPassword('');

            history.push('/')
        } catch(err) {
            alert('Erro ao realizar o cadastro.');

            setNome('');
            setEmail('');
            setPassword('');
        }
    }


    return(
        <div className="body-log">
            <form className='singup-form' onSubmit={hundleSubmit}>
                <h1>Sign-Up</h1>

                <div className='txtb'> 
                    <input 
                        type='text' 
                        className={focusNome}
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        onFocus={e => setFocusNome('focus')}
                    />
                    <span data-placeholder='Nome'></span>
                </div>

                <div className='txtb'> 
                    <input 
                        type='text' 
                        className={focusEmail}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={e => setFocusEmail('focus')}
                    />
                    <span data-placeholder='Email'></span>
                </div>

                <div className='txtb'> 
                    <input 
                        type='password' 
                        className={focusPass}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={e => setFocusPass('focus')}
                    />
                    <span data-placeholder='Senha'></span>
                </div>
                <input type='submit' className='logbtn' value='Cadastrar' />
                
                <div className='bottom-text' >
                    Já é cadastrado? <Link to='/'>Sign in</Link>
                </div>
            </form>
        </div>
        
    );
        
}

export default Signup;