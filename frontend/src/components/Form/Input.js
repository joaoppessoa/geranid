import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useField } from '@unform/core';

export default function Input({ label, name, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    return(
        <Form.Group>
            <Form.Label >{label}</Form.Label>
            <Form.Control ref={inputRef} defaultValue={defaultValue} {...rest} />
        </Form.Group>
    );
}