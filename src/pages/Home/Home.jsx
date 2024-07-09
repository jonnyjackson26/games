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
            <GameCard name="Conways Game of Life" to="/conways-game-of-life" />
            <GameCard name="Connect 4" to="/connect-4" />
            <GameCard name="Minesweeper" to="/minesweeper" />
            <GameCard name="Sudoku" to="/sudoku" />
            <GameCard name="2048" to="/2048" />
            <GameCard name="Snake" to="/snake" />
        </>
    );
};

export default Home;