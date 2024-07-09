import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home';
import About from './pages/About/About'
import UltimateTicTacToe from './pages/UltimateTicTacToe/UltimateTicTacToe';
import MemoryGame from './pages/MemoryGame/MemoryGame';
import TicTacToe from './pages/TicTacToe/TicTacToe';
import TwentyFourtyEight from './pages/2048/TwentyFourtyEight';
import Snake from './pages/Snake/Snake';
import Connect4 from './pages/Connect4/Connect4';
import ConwaysGameOfLife from './pages/ConwaysGameOfLife/ConwaysGameOfLife'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Sudoku from './pages/Sudoku/Sudoku';
import Minesweeper from './pages/Minesweeper/Minesweeper';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/tic-tac-toe",
    element: <TicTacToe />,
  },
  {
    path: "/ultimate-tic-tac-toe",
    element: <UltimateTicTacToe />,
  },
  {
    path: "/memory-game",
    element: <MemoryGame />,
  },
  {
    path: "/snake",
    element: <Snake />,
  },
  {
    path: "/conways-game-of-life",
    element: <ConwaysGameOfLife />,
  },
  {
    path: "/connect-4",
    element: <Connect4 />,
  },
  {
    path: "/2048",
    element: <TwentyFourtyEight />,
  },
  {
    path: "/sudoku",
    element: <Sudoku />,
  },
  {
    path: "/minesweeper",
    element: <Minesweeper />,
  },
])


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