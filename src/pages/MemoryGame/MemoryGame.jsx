import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const Point = (x, y) => ({ x, y });

const MemoryGame = () => {
    const rows = 5;
    const cols = 5;
    const [highScore, setHighScore] = useState(3);
    const [boxesShowing, setBoxesShowing] = useState(3);
    const [correctBoxesCount, setCorrectBoxesCount] = useState(0);
    const [showingBoxes, setShowingBoxes] = useState(generateShowingBoxes(3));

    useEffect(() => {
        drawShowingBoxes();
    }, [showingBoxes]);

    function generateShowingBoxes(numOfShowingBoxes) {
        const points = [];
        while (points.length < numOfShowingBoxes) {
            const randomPoint = Point(
                Math.floor(Math.random() * rows),
                Math.floor(Math.random() * cols)
            );
            let isUniquePoint = true;
            for (let i = 0; i < points.length; i++) {
                if (points[i].x === randomPoint.x && points[i].y === randomPoint.y) {
                    isUniquePoint = false;
                    break;
                }
            }
            if (isUniquePoint) {
                points.push(randomPoint);
            }
        }
        return points;
    }

    function drawShowingBoxes() {
        const allSquares = document.getElementsByClassName('boxClass');
        for (let i = 0; i < allSquares.length; i++) {
            allSquares[i].style.backgroundColor = 'black';
            allSquares[i].innerHTML = '';
        }
        for (let i = 0; i < showingBoxes.length; i++) {
            const boxToBeShown = document.getElementById(
                `box${showingBoxes[i].x},${showingBoxes[i].y}`
            );
            if (boxToBeShown) {
                boxToBeShown.innerHTML = `<p class='boxText'>${i + 1}</p>`;
            }
        }
    }

    function resetGame() {
        setCorrectBoxesCount(0);
        setShowingBoxes(generateShowingBoxes(boxesShowing));
    }

    function clickedBox(e) {
        const allSquares = document.getElementsByClassName('boxClass');
        for (let i = 0; i < showingBoxes.length; i++) {
            const boxToBeShown = document.getElementById(
                `box${showingBoxes[i].x},${showingBoxes[i].y}`
            );
            if (boxToBeShown) {
                boxToBeShown.innerHTML = '';
            }
        }
        e.target.style.backgroundColor = 'white';

        const x = parseInt(e.target.id.substring(3, 4), 10);
        const y = parseInt(e.target.id.substring(5, 6), 10);

        if (
            showingBoxes[correctBoxesCount].x === x &&
            showingBoxes[correctBoxesCount].y === y
        ) {
            setCorrectBoxesCount(correctBoxesCount + 1);
            if (correctBoxesCount + 1 === showingBoxes.length) {
                setBoxesShowing(boxesShowing + 1);
                if (boxesShowing + 1 > rows * cols) {
                    alert('Congratulations! You win! Press Enter to start again.');
                    setBoxesShowing(3);
                } else {
                    alert('Great Job! Press enter to go to the next level!');
                }
                if (boxesShowing > highScore) {
                    setHighScore(boxesShowing);
                }
                resetGame();
            }
        } else {
            alert('Uh oh! You lost. Press enter to play again!');
            setBoxesShowing(3);
            resetGame();
        }
    }

    return (
        <div className="memory-game">
            <h1>Memory Game</h1>
            <h3 id="highScoreText">High Score: {highScore}</h3>
            <div id="board">
                {Array.from({ length: rows * cols }).map((_, i) => {
                    const x = Math.floor(i / cols);
                    const y = i % cols;
                    return (
                        <div
                            key={`${x},${y}`}
                            id={`box${x},${y}`}
                            className="boxClass"
                            onClick={clickedBox}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

export default MemoryGame;
