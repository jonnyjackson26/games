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

import gamesInfo from './gamesInfo';
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