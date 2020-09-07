import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <Header />
                <Sidebar />
            </div>
        )
    }
}

export default Home;