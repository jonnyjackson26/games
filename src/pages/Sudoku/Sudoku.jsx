import React, { useState } from 'react';
import './Sudoku.css';
import { Link } from 'react-router-dom';

const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const Sudoku = () => {
    const [board, setBoard] = useState(initialBoard);
    const [message, setMessage] = useState('');

    const handleChange = (row, col, value) => {
        const newBoard = board.map((rowArr, rowIndex) =>
            rowArr.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
        );
        setBoard(newBoard);
    };

    const isValidBoard = () => {
        for (let i = 0; i < 9; i++) {
            let row = new Set();
            let col = new Set();
            let box = new Set();
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== 0) {
                    if (row.has(board[i][j])) return false;
                    row.add(board[i][j]);
                }
                if (board[j][i] !== 0) {
                    if (col.has(board[j][i])) return false;
                    col.add(board[j][i]);
                }
                let boxRow = 3 * Math.floor(i / 3) + Math.floor(j / 3);
                let boxCol = 3 * (i % 3) + (j % 3);
                if (board[boxRow][boxCol] !== 0) {
                    if (box.has(board[boxRow][boxCol])) return false;
                    box.add(board[boxRow][boxCol]);
                }
            }
        }
        return true;
    };

    const handleSubmit = () => {
        if (isValidBoard()) {
            setMessage('Congratulations! Your solution is correct.');
        } else {
            setMessage('There are errors in your solution.');
        }
    };

    return (
        <div className="sudoku">
            <h1>Sudoku</h1>
            <Link to='/'>Back Home</Link>
            <div className="sudoku-board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="sudoku-row">
                        {row.map((cell, colIndex) => (
                            <input
                                key={colIndex}
                                type="number"
                                min="1"
                                max="9"
                                value={cell !== 0 ? cell : ''}
                                onChange={(e) => handleChange(rowIndex, colIndex, parseInt(e.target.value) || 0)}
                                className="sudoku-cell"
                            />
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Check Solution</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Sudoku;
