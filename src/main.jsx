/*
when you add a new game, 
1. import it
2. add it to gamesInfo
3. add it to componentMap
*/


import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About'
import UltimateTicTacToe from './pages/UltimateTicTacToe/UltimateTicTacToe';
import MemoryGame from './pages/MemoryGame/MemoryGame';
import TicTacToe from './pages/TicTacToe/TicTacToe';
import TwentyFourtyEight from './pages/2048/TwentyFourtyEight';
import Snake from './pages/Snake/Snake';
import Connect4 from './pages/Connect4/Connect4';
import ConwaysGameOfLife from './pages/ConwaysGameOfLife/ConwaysGameOfLife'
import Sudoku from './pages/Sudoku/Sudoku';
import Minesweeper from './pages/Minesweeper/Minesweeper';


const gamesInfo = [
  {
    name: "Tic Tac Toe",
    componentName: "TicTacToe",
    photo: "TicTacToe.png",
    url: "/tic-tac-toe"
  },
  {
    name: "Ultimate Tic Tac Toe",
    componentName: "UltimateTicTacToe",
    photo: "UltimateTicTacToe.png",
    url: "/ultimate-tic-tac-toe"
  },
  {
    name: "Memory Game",
    componentName: "MemoryGame",
    photo: "MemoryGame.png",
    url: "/memory-game"
  },
  {
    name: "Conways Game of Life",
    componentName: "ConwaysGameOfLife",
    photo: "ConwaysGameOfLife.gif",
    url: "/conways-game-of-life"
  },
  {
    name: "Connect 4",
    componentName: "Connect4",
    photo: "Connect4.jpg",
    url: "/connect-4"
  },
  {
    name: "Minesweeper",
    componentName: "Minesweeper",
    photo: "Minesweeper.png",
    url: "/minesweeper"
  },
  {
    name: "Sudoku",
    componentName: "Sudoku",
    photo: "Sudoku.png",
    url: "/sudoku"
  },
  {
    name: "2048",
    componentName: "TwentyFourtyEight",
    photo: "TwentyFourtyEight.gif",
    url: "/2048"
  },
  {
    name: "Snake",
    componentName: "Snake",
    photo: "Snake.jpg",
    url: "/snake"
  }
];

const componentMap = {
  TicTacToe,
  UltimateTicTacToe,
  MemoryGame,
  ConwaysGameOfLife,
  Connect4,
  Minesweeper,
  Sudoku,
  TwentyFourtyEight,
  Snake
};


const gameRoutes = gamesInfo.map(game => ({
  path: game.url,
  element: React.createElement(componentMap[game.componentName])
}));

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  ...gameRoutes
]);


export const Context = React.createContext();

function Main() {


  return (
    <Context.Provider>
      <RouterProvider router={router} />
    </Context.Provider>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)