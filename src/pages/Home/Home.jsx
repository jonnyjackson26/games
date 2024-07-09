import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import GameCard from '../../components/GameCard/GameCard';

import gamesInfo from '../../gamesInfo';

const Home = () => {


    return (
        <>
            <h1>Games</h1>
            <Link to='/about'>About us</Link>
            <div className="gameCard-container">
                {gamesInfo.map(gameObject => (
                    <GameCard
                        key={gameObject.url}
                        game={gameObject}
                    />
                ))}
            </div>

        </>
    );
};

export default Home;