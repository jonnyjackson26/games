import React, { useState, useEffect } from 'react';
import './TicTacToe.css'
import { Link } from 'react-router-dom';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [whosTurn, setWhosTurn] = useState('O');
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("It's O's turn");

    useEffect(() => {
        const winner = returnWinner();
        if (winner) {
            setMessage(`${winner} wins!`);
            setGameOver(true);
        } else if (!board.includes('')) {
            setMessage("Cats Game!");
            setGameOver(true);
        } else {
            setMessage(`It's ${whosTurn}'s turn`);
        }
    }, [board]);

    const handleClick = (index) => {
        if (gameOver || board[index]) return;

        const newBoard = board.slice();
        newBoard[index] = whosTurn;
        setBoard(newBoard);
        setWhosTurn(whosTurn === 'O' ? 'X' : 'O');
    };

    const returnWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const resetGame = () => {
        setBoard(Array(9).fill(''));
        setWhosTurn('O');
        setGameOver(false);
        setMessage("It's O's turn");
    };

    return (
        <div className="tictactoe">
            <h1>Tic-Tac-Toe</h1>

            <Link to='/'>Back Home</Link>
            <hr />
            <div id="board">
                {board.map((value, index) => (
                    <div
                        key={index}
                        className={`box ${value}`}
                        onClick={() => handleClick(index)}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <p id="whosTurn">{message}</p>
            <button id="butt" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
