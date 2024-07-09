import React, { useState } from 'react';
import './UltimateTicTacToe.css';
import { Link } from 'react-router-dom';

const initialBoard = Array(9).fill().map(() => Array(9).fill(''));

const UltimateTicTacToe = () => {
    const [board, setBoard] = useState(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [mainBoard, setMainBoard] = useState(Array(9).fill(''));
    const [activeBoard, setActiveBoard] = useState(null);

    const handleClick = (mainIdx, idx) => {
        if (activeBoard !== null && activeBoard !== mainIdx) return;
        if (board[mainIdx][idx] || mainBoard[mainIdx]) return;

        const newBoard = board.slice();
        newBoard[mainIdx][idx] = currentPlayer;
        setBoard(newBoard);

        const newMainBoard = mainBoard.slice();
        const winner = checkWinner(newBoard[mainIdx]);
        if (winner) newMainBoard[mainIdx] = winner;
        setMainBoard(newMainBoard);

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        setActiveBoard(newMainBoard[idx] ? null : idx);
    };

    const checkWinner = (board) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.every(cell => cell) ? 'T' : null;
    };

    return (
        <div className="ultimate-tic-tac-toe">
            <h1>Ultimate Tic Tac Toe</h1>
            <Link to='/'>Back Home</Link>
            <div className="main-board">
                {mainBoard.map((mainCell, mainIdx) => (
                    <div key={mainIdx} className={`main-cell ${activeBoard === mainIdx || activeBoard === null ? 'active' : ''}`}>
                        {mainCell ? (
                            <div className="winner">{mainCell}</div>
                        ) : (
                            <div className="board">
                                {board[mainIdx].map((cell, idx) => (
                                    <div key={idx} className="cell" onClick={() => handleClick(mainIdx, idx)}>
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="status">
                <h2>Current Player: {currentPlayer}</h2>
                <h3>{activeBoard !== null ? `Play in board ${activeBoard + 1}` : 'Play in any board'}</h3>
            </div>
        </div>
    );
};

export default UltimateTicTacToe;
