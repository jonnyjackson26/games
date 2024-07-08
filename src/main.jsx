import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home';
import About from './pages/About/About'
import UltimateTicTacToe from './pages/UltimateTicTacToe/UltimateTicTacToe';
import MemoryGame from './pages/MemoryGame/MemoryGame';
import TicTacToe from './pages/TicTacToe/TicTacToe';
import { createHashRouter, RouterProvider } from 'react-router-dom'

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