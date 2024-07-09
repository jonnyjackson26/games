import React, { useState, useEffect } from 'react';
import './TwentyFourtyEight.css'
import { Link } from 'react-router-dom';

const SIZE = 4;

const getInitialGrid = () => {
    const grid = Array(SIZE).fill().map(() => Array(SIZE).fill(0));
    addRandomTile(grid);
    addRandomTile(grid);
    return grid;
};

const addRandomTile = (grid) => {
    let emptyCells = [];
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (grid[row][col] === 0) emptyCells.push({ row, col });
        }
    }
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
};

const mergeRowLeft = (row) => {
    let newRow = row.filter(val => val);
    while (newRow.length < SIZE) newRow.push(0);
    for (let i = 0; i < SIZE - 1; i++) {
        if (newRow[i] === newRow[i + 1] && newRow[i] !== 0) {
            newRow[i] *= 2;
            newRow[i + 1] = 0;
        }
    }
    newRow = newRow.filter(val => val);
    while (newRow.length < SIZE) newRow.push(0);
    return newRow;
};

const transposeGrid = (grid) => grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));

const reverseGrid = (grid) => grid.map(row => row.reverse());

const moveLeft = (grid) => grid.map(row => mergeRowLeft(row));

const moveRight = (grid) => reverseGrid(moveLeft(reverseGrid(grid)));

const moveUp = (grid) => transposeGrid(moveLeft(transposeGrid(grid)));

const moveDown = (grid) => transposeGrid(moveRight(transposeGrid(grid)));

const hasMovesAvailable = (grid) => {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (grid[row][col] === 0) return true;
            if (col < SIZE - 1 && grid[row][col] === grid[row][col + 1]) return true;
            if (row < SIZE - 1 && grid[row][col] === grid[row + 1][col]) return true;
        }
    }
    return false;
};

const TwentyFourtyEight = () => {
    const [grid, setGrid] = useState(getInitialGrid);
    const [gameOver, setGameOver] = useState(false);

    const handleKeyDown = (event) => {
        if (gameOver) return;

        let newGrid;
        switch (event.key) {
            case 'ArrowLeft':
                newGrid = moveLeft(grid);
                break;
            case 'ArrowRight':
                newGrid = moveRight(grid);
                break;
            case 'ArrowUp':
                newGrid = moveUp(grid);
                break;
            case 'ArrowDown':
                newGrid = moveDown(grid);
                break;
            default:
                return;
        }

        if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
            addRandomTile(newGrid);
            setGrid(newGrid);
        }

        if (!hasMovesAvailable(newGrid)) {
            setGameOver(true);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [grid, gameOver]);

    const resetGame = () => {
        setGrid(getInitialGrid());
        setGameOver(false);
    };

    return (
        <div className="game-2048">
            <h1>2048</h1>
            <Link to='/'>Back Home</Link>
            <div className="twentyFourtyEight-board">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="twentyFourtyEight-row">
                        {row.map((cell, colIndex) => (
                            <div key={colIndex} className={`twentyFourtyEight-cell cell-${cell}`}>
                                {cell !== 0 && cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {gameOver && <div className="game-over">Game Over</div>}
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default TwentyFourtyEight;
