import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Conteiner from '../components/Conteiner';

function Home() {
    
    return (
        <div className="wrapper">
            <Header />
            <Sidebar />
            <Conteiner />
        </div>
    );
}

export default Home;