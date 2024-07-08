import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {


    return (
        <>
            <h1>Games</h1>

            <Link to='/about'>About us</Link>

        </>
    );
};

export default Home;