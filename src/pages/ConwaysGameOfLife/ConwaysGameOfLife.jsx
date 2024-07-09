import React, { useState, useEffect, useCallback } from 'react';
import './ConwaysGameOfLife.css';
import { Link } from 'react-router-dom';

const SIZE = 20; // Define the size of the grid

const generateEmptyGrid = () => {
    return Array(SIZE).fill().map(() => Array(SIZE).fill(false));
};

const ConwaysGameOfLife = () => {
    const [grid, setGrid] = useState(generateEmptyGrid());
    const [running, setRunning] = useState(false);

    const runSimulation = useCallback(() => {
        if (!running) {
            return;
        }

        setGrid(g => {
            return g.map((row, rowIndex) => {
                return row.map((col, colIndex) => {
                    const neighbors = [
                        [0, 1],
                        [0, -1],
                        [1, 0],
                        [-1, 0],
                        [1, 1],
                        [-1, -1],
                        [1, -1],
                        [-1, 1]
                    ];
                    let liveNeighbors = 0;
                    neighbors.forEach(([x, y]) => {
                        const newI = rowIndex + x;
                        const newJ = colIndex + y;
                        if (newI >= 0 && newI < SIZE && newJ >= 0 && newJ < SIZE) {
                            liveNeighbors += g[newI][newJ] ? 1 : 0;
                        }
                    });

                    if (col && (liveNeighbors < 2 || liveNeighbors > 3)) {
                        return false;
                    } else if (!col && liveNeighbors === 3) {
                        return true;
                    } else {
                        return col;
                    }
                });
            });
        });

        setTimeout(runSimulation, 100);
    }, [running]);

    useEffect(() => {
        if (running) {
            runSimulation();
        }
    }, [running, runSimulation]);

    const toggleCell = (row, col) => {
        const newGrid = grid.map((rowArr, rowIndex) =>
            rowArr.map((cell, colIndex) => {
                if (rowIndex === row && colIndex === col) {
                    return !cell;
                }
                return cell;
            })
        );
        setGrid(newGrid);
    };

    const handleRandom = () => {
        const newGrid = grid.map(row => row.map(() => Math.random() > 0.7));
        setGrid(newGrid);
    };

    return (
        <div className="game-of-life">
            <h1>Conway's Game of Life</h1>
            <Link to='/'>Back Home</Link>
            <div className="conways-controls">
                <button onClick={() => setRunning(!running)}>
                    {running ? 'Stop' : 'Start'}
                </button>
                <button onClick={() => setGrid(generateEmptyGrid())}>Clear</button>
                <button onClick={handleRandom}>Random</button>
            </div>
            <div className="conways-grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="conways-row">
                        {row.map((col, colIndex) => (
                            <div
                                key={colIndex}
                                className={`conways-cell ${col ? 'alive' : ''}`}
                                onClick={() => toggleCell(rowIndex, colIndex)}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConwaysGameOfLife;
