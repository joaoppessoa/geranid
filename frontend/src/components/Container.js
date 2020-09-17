import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import '../css/cssComponets/styleContainer.css';
import api from '../services/api';

function Container() {
    const [users, setUsers] = useState([]);
    const [nome, setNome] = useState('');
    const id_session = localStorage.getItem('id_session');

   /* useEffect(() => {
        api.get('users', {
            headers: {
                Authorization: id_session
            }
        }).then(response => {
            setUsers(response.data);
        });
    }, [id_session]);*/

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
            <div className='title-board' >
                <h3>CHAMADOS</h3>
            </div>
            {/*Inicicio do border-content*/}
            <div className="board-content">
                {/*Inicicio do box-wrapper*/}
                <div className="box-wrapper" >
                    {/*Inicicio do board-item*/}
                    <div className="board-item" >
                        <div className="background" ></div>
                        {/*Inicicio do group-wrapper*/}
                        <div className="group-wrapper">
                            {/** Inicio da group-header-component */}
                            <div className="group-header-component" >
                                <div className="group-menu" >
                                    <div className="ds-menu-button-container">
                                        <a href="#" className="group-menu-button"><i class="fas fa-caret-square-down"></i></a>
                                    </div>
                                </div>

                                {/** Inicio da name-column-header */}
                                <div className="name-column-header">
                                    <div className="column-header-inner">
                                        <span className="group-name">
                                            <div className="ds-editable-component">
                                                <div className="ds-text-component">
                                                    <span>Análise inicial</span>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                {/** Fim da name-column-header */}
                                
                                {/** Inicio da column-header */}
                                <div className="column-header">
                                    
                                </div>
                                {/** Inicio da column-header */}
                            </div>
                            {/** Fim da group-header-component */}
                        </div>
                        {/*fim do group-wrapper*/}
                    </div>
                    {/*fim do board-item*/}
                </div>
                {/*fim do box-wrapper*/}
            </div>  
            {/*Fim do border-content*/}
        </div>
    )
}

export default Container;