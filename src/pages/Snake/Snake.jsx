import React, { useState, useEffect } from 'react';
import './Snake.css';
import { Link } from 'react-router-dom';

const COLS = 20;
const ROWS = 20;
const INITIAL_SNAKE = [{ row: 10, col: 10 }];
const INITIAL_DIRECTION = { row: 0, col: 1 };

const generateFoodPosition = () => ({
    row: Math.floor(Math.random() * ROWS),
    col: Math.floor(Math.random() * COLS)
});

const Snake = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState(generateFoodPosition());
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (gameOver) return;
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.row === 0) setDirection({ row: -1, col: 0 });
                    break;
                case 'ArrowDown':
                    if (direction.row === 0) setDirection({ row: 1, col: 0 });
                    break;
                case 'ArrowLeft':
                    if (direction.col === 0) setDirection({ row: 0, col: -1 });
                    break;
                case 'ArrowRight':
                    if (direction.col === 0) setDirection({ row: 0, col: 1 });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction, gameOver]);

    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const newSnake = [...prevSnake];
                const newHead = {
                    row: newSnake[0].row + direction.row,
                    col: newSnake[0].col + direction.col
                };

                if (
                    newHead.row < 0 ||
                    newHead.col < 0 ||
                    newHead.row >= ROWS ||
                    newHead.col >= COLS ||
                    newSnake.some(segment => segment.row === newHead.row && segment.col === newHead.col)
                ) {
                    setGameOver(true);
                    clearInterval(interval);
                    return prevSnake;
                }

                newSnake.unshift(newHead);

                if (newHead.row === food.row && newHead.col === food.col) {
                    setFood(generateFoodPosition());
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [direction, food, gameOver]);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(generateFoodPosition());
        setGameOver(false);
    };

    return (
        <div className="snake-game">
            <h1>Snake Game</h1>
            <Link to='/'>Back Home</Link>
            <div className="snake-board">
                {Array.from({ length: ROWS }).map((_, rowIndex) => (
                    <div key={rowIndex} className="snake-row">
                        {Array.from({ length: COLS }).map((_, colIndex) => {
                            const isSnakeSegment = snake.some(segment => segment.row === rowIndex && segment.col === colIndex);
                            const isFood = food.row === rowIndex && food.col === colIndex;
                            return (
                                <div
                                    key={colIndex}
                                    className={`snake-cell ${isSnakeSegment ? 'snake' : ''} ${isFood ? 'snake-food' : ''}`}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>
            {gameOver && <div className="game-over">Game Over</div>}
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default Snake;
