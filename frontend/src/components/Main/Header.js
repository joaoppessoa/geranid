import React from 'react';
import { Col } from 'react-bootstrap';

import './styles.css';

export default function Header({ title }) {
    return(
        <Col md={12} id="title-main">
            <h3><span>{title}</span></h3>
        </Col>
    );
}