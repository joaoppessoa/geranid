import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../css/styleSign.css';
import api from '../services/api';


function Signin () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusEmail, setFocusEmail] = useState('');
    const [focusPass, setFocusPass] = useState('');

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

            setEmail('');
            setPassword('');

            history.push('/home');
        } catch (err) {
            alert('Falha no login, tente novamente.');
            setEmail('');
            setPassword('');
        }
    }
    
    return(
        <div className="body-log">
            <form className='login-form' onSubmit={handleSubmit}>
                <h1>Log in</h1>

                <div className='txtb'> 
                    <input 
                        type='text' 
                        value={email}
                        className={focusEmail} 
                        onFocus={e => setFocusEmail('focus')} 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <span data-placeholder='Email'></span>
                </div>

                <div className='txtb'> 
                    <input 
                        type='password'
                        value={password}
                        className={focusPass}
                        onFocus={e => setFocusPass('focus')}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <span data-placeholder='Password'></span>
                </div>

                <input type='submit' className='logbtn' value='Login' />
                
                <div className='bottom-text' >
                    Não tem uma conta? <Link to='/sign-up'>Sign up</Link>
                </div>

            </form>
        </div>
    );
}

export default Signin;