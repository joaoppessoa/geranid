import React, { useEffect, useState } from 'react';
import '../css/cssComponets/styleContainer.css';
import api from '../services/api';

function Container() {
    const [users, setUsers] = useState([]);
    const [nome, setNome] = useState('');
    const id_session = localStorage.getItem('id_session');

    useEffect(() => {
        api.get('users', {
            headers: {
                Authorization: id_session
            }
        }).then(response => {
            setUsers(response.data);
        });
    }, [id_session]);

    async function handlerEdit(e) {
        e.preventDefault();

        const data = {
            nome
        }
        //console.log(data);
        
        
        try {
            await api.put('users', data, {
                headers: {Authorization: id_session}
            });

        } catch(err) {
            console.log(err);
        }
    }

    return(
        <div className="container">
            <ul>
                <span>New Group</span>
                {users.map(user => (
                    <li key={user.id}>
                        <a href="#">
                            <input 
                                type="text" 
                                defaultValue={user.nome} 
                                onChange={e => setNome(e.target.value)}
                                onBlur={handlerEdit}
                            />
                        </a>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}

export default Container;