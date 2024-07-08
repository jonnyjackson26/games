import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import GameCard from '../../components/GameCard/GameCard';

const Home = () => {


    return (
        <>
            <h1>Games</h1>

            <Link to='/about'>About us</Link>
            <GameCard name="Tic Tac Toe" to="/tic-tac-toe" />
            <GameCard name="Ultimate Tic Tac Toe" to="/ultimate-tic-tac-toe" />
            <GameCard name="Memory Game" to="/memory-game" />

        </>
    );
};

export default Home;