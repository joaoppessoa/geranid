import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Container from '../components/Container';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <Header />
                <Sidebar />
                <Container />
            </div>
        );
    }
}

export default Home;