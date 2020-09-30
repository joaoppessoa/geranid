import React, { useEffect, useState } from 'react';
import MultiSelect from "react-multi-select-component";
import api from '../../services/api';

import './styles.css';

export default function SlectUsers() {
    const [usuarios, setUsuarios] = useState([]);
    const [selected, setSelected] = useState([]);
 

    useEffect(() => {
        api.get('users').then(response => {
            setUsuarios(response.data)
        });
    }, []);

    return (
        <div>
            <label></label>
            <MultiSelect
                options={usuarios}
                value={selected}
                onChange={setSelected}
                labelledBy={"Select"}
            />
        </div>
       
    );
}