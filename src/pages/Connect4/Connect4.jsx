import React, { useState } from 'react';
import './Connect4.css';
import { Link } from 'react-router-dom';

const Connect4 = () => {
    const rows = 6;
    const cols = 7;
    const [board, setBoard] = useState(Array(rows).fill().map(() => Array(cols).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('Red');
    const [winner, setWinner] = useState(null);

    const handleClick = (col) => {
        if (winner) return;

        const newBoard = board.map(row => row.slice());
        for (let row = rows - 1; row >= 0; row--) {
            if (!newBoard[row][col]) {
                newBoard[row][col] = currentPlayer;
                break;
            }
        }

        setBoard(newBoard);

        if (checkWinner(newBoard)) {
            setWinner(currentPlayer);
        } else {
            setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
        }
    };

    const checkWinner = (board) => {
        const directions = [
            { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: -1 }
        ];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (board[row][col]) {
                    for (let { x, y } of directions) {
                        const line = Array(4).fill().map((_, i) => {
                            return board[row + i * y] && board[row + i * y][col + i * x];
                        });
                        if (line.every(cell => cell === board[row][col])) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };

    return (
        <div className="connect4">
            <h1>Connect 4</h1>
            <Link to='/'>Back Home</Link>
            <div className="connect-4-board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="connect-4-row">
                        {row.map((cell, colIndex) => (
                            <div key={colIndex} className="connect-4-cell" onClick={() => handleClick(colIndex)}>
                                {cell && <div className={`connect-4-disc ${cell.toLowerCase()}`}></div>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {winner && <h2>{winner} wins!</h2>}
            <button onClick={() => {
                setBoard(Array(rows).fill().map(() => Array(cols).fill(null)));
                setCurrentPlayer('Red');
                setWinner(null);
            }}>Reset Game</button>
        </div>
    );
};

export default Connect4;
