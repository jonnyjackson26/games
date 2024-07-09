import React from 'react';
import './GameCard.css'
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {


    return (
        <>

            <div className='gameCard'>
                <Link to={game.url} className='gameCard-link'>
                    <h3>{game.name}</h3>
                    <img src={'public/games/' + game.photo} alt="" />
                </Link>
            </div>

        </>
    );
};

export default GameCard;