import React from 'react';
import './GameCard.css'
import { Link } from 'react-router-dom';

const GameCard = ({ name, to }) => {


    return (
        <>
            <Link to={to} className='gameCard-link'>
                <div className='gameCard'>
                    <h3>{name}</h3>
                </div>
            </Link>
        </>
    );
};

export default GameCard;