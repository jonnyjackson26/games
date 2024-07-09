import React, { useState, useEffect } from 'react';
import './Minesweeper.css';
import { Link } from 'react-router-dom';

const SIZE = 10;
const MINES_COUNT = 10;

const generateBoard = () => {
    const board = Array(SIZE).fill().map(() => Array(SIZE).fill({
        revealed: false,
        mine: false,
        flagged: false,
        adjacentMines: 0
    }));

    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
        const row = Math.floor(Math.random() * SIZE);
        const col = Math.floor(Math.random() * SIZE);

        if (!board[row][col].mine) {
            board[row][col] = { ...board[row][col], mine: true };
            minesPlaced++;
        }
    }

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (!board[row][col].mine) {
                board[row][col].adjacentMines = getAdjacentMinesCount(board, row, col);
            }
        }
    }

    return board;
};

const getAdjacentMinesCount = (board, row, col) => {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    return directions.reduce((count, [dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        if (newRow >= 0 && newRow < SIZE && newCol >= 0 && newCol < SIZE && board[newRow][newCol].mine) {
            return count + 1;
        }
        return count;
    }, 0);
};

const Minesweeper = () => {
    const [board, setBoard] = useState(generateBoard());
    const [gameOver, setGameOver] = useState(false);
    const [victory, setVictory] = useState(false);

    const revealCell = (row, col) => {
        if (gameOver || board[row][col].revealed || board[row][col].flagged) return;

        const newBoard = board.map(row => row.map(cell => ({ ...cell })));

        const stack = [{ row, col }];
        while (stack.length) {
            const { row, col } = stack.pop();

            if (newBoard[row][col].revealed) continue;

            newBoard[row][col].revealed = true;

            if (newBoard[row][col].mine) {
                setGameOver(true);
                return;
            }

            if (newBoard[row][col].adjacentMines === 0) {
                const directions = [
                    [-1, -1], [-1, 0], [-1, 1],
                    [0, -1], [0, 1],
                    [1, -1], [1, 0], [1, 1]
                ];

                directions.forEach(([dx, dy]) => {
                    const newRow = row + dx;
                    const newCol = col + dy;

                    if (newRow >= 0 && newRow < SIZE && newCol >= 0 && newCol < SIZE && !newBoard[newRow][newCol].revealed) {
                        stack.push({ row: newRow, col: newCol });
                    }
                });
            }
        }

        setBoard(newBoard);
        checkVictory(newBoard);
    };

    const toggleFlag = (row, col) => {
        if (gameOver || board[row][col].revealed) return;

        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        newBoard[row][col].flagged = !newBoard[row][col].flagged;
        setBoard(newBoard);
    };

    const checkVictory = (board) => {
        const isVictory = board.every(row => row.every(cell => cell.mine === cell.flagged || (!cell.mine && cell.revealed)));
        if (isVictory) {
            setVictory(true);
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setBoard(generateBoard());
        setGameOver(false);
        setVictory(false);
    };

    return (
        <div className="minesweeper-game">
            <h1>Minesweeper</h1>
            <Link to="/" className="back-home">Back Home</Link>
            <div className="minesweeper-board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="minesweeper-row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className={`minesweeper-cell ${cell.revealed ? 'revealed' : ''} ${cell.flagged ? 'flagged' : ''}`}
                                onClick={() => revealCell(rowIndex, colIndex)}
                                onContextMenu={(e) => { e.preventDefault(); toggleFlag(rowIndex, colIndex); }}
                            >
                                {cell.revealed && (cell.mine ? '💣' : cell.adjacentMines > 0 ? cell.adjacentMines : '')}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {gameOver && <div className={`game-status ${victory ? 'victory' : 'defeat'}`}>{victory ? 'Victory!' : 'Game Over'}</div>}
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default Minesweeper;
