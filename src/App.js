import React  from 'react'
import ghost from 'c:/Dev/Tic-Tac-Toe/src/media/giphy (5).gif'
import scared from 'c:/Dev/Tic-Tac-Toe/src/media/R.gif'
import scooby from  'c:/Dev/Tic-Tac-Toe/src/media/icons8-scooby-doo-96.png'
import shaggy from 'c:/Dev/Tic-Tac-Toe/src/media/icons8-scooby-doo-shaggy-rogers-96.png'
import zoinks from 'c:/Dev/Tic-Tac-Toe/src/media/giphy (6).gif'
import jinkies from 'c:/Dev/Tic-Tac-Toe/src/media/giphy.gif'
import logo from 'c:/Dev/Tic-Tac-Toe/src/media/text-1694597576966.png'
import van from 'c:/Dev/Tic-Tac-Toe/src/media/giphy (1).gif'
import running_scooby from 'c:/Dev/Tic-Tac-Toe/src/media/giphy (2).gif'
import running_shaggy from 'c:/Dev/Tic-Tac-Toe/src/media/giphy (4).gif'
import Modal from 'react-modal';

import { useState} from 'react';

function Square({ value, onSquareClick,id }) {
  let content;
  if(value ==="Scooby"){
      content = <img className="scooby-avatar" src={scooby} alt="scooby-avatar" width = "100px" onClick={onSquareClick}></img>
  }
  else if(value ==="Shaggy"){
    content = <img className="shaggy-avatar" src={shaggy} alt="shaggy-avatar" width = "100px" onClick={onSquareClick}></img>
  }
  return (
    <button className="square" onClick={onSquareClick} id={id}>
      {content}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'Scooby';
    } else {
      nextSquares[i] = 'Shaggy';
    }
    onPlay(nextSquares);
  }
  const [modalIsOpen,setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue =()=>{
      setModalIsOpen(true)
  }

  const setModalIsOpenToFalse =()=>{
      setModalIsOpen(false);
  }


  const winner = calculateWinner(squares);
  let status;
  let prize;
  if (winner) {
    status = 'Winner: ' + winner;
    prize= <button className="open" onClick={setModalIsOpenToTrue}>Get your prize </button>
  } else {
    status = 'Next player: ' + (xIsNext ? 'Scooby' : 'Shaggy');
  }
    const bg = {
      overlay: {
        background: "#FFFF00"
      }
    }; 

  return (
    <div className='game-board'>
    <div>
      <div className="status">{status}</div>
      <div className ="parent">
        <div className="child">
        <img className="van" src={van} alt="van" width = "100px"></img>
        </div>
      <div className="grid">
      <div className="board-row">
        <Square id="0" value={squares[0]}  onSquareClick={() => handleClick(0)}  />
        <Square id="1" value={squares[1]}  onSquareClick={() => handleClick(1)}  />
        <Square id="2" value={squares[2]}  onSquareClick={() => handleClick(2)}  />
      </div>
      <div className="board-row">
        <Square id="3" value={squares[3]} onSquareClick={() => handleClick(3)}  />
        <Square id="4" value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square id="5" value={squares[5]} onSquareClick={() => handleClick(5)}  />
      </div>
      <div className="board-row">
        <Square id="6" value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square id="7" value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square id="8" value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      </div>
      </div>
      <div className="prize">{prize}
          <Modal className="modal"  isOpen={modalIsOpen} onRequestClose={()=> setModalIsOpen(false)} styles={bg}>
              <button className="close" onClick={setModalIsOpenToFalse}>X</button>
              <div className="prize-message">
                <h2>Well Done {winner} !!</h2>
                <p>Treat yourself with unlimited Scooby Snacks and sandwiches </p> 
              </div>
            </Modal>
      </div>
    </div>
    </div>
  
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    for (let i = 0; i < 9; i++) {
      document.getElementById(i.toString()).className = "square";
    }
  }


  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button className="move" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div>
    <div className="game">
    <div>
        <img className="scared" src={scared} alt="scared" width = "250px"></img>
      </div>
      <div>
      <img className="jinkies" src={jinkies} alt="jinkies" width = "220px"></img>
      </div>
      <div className="game-board">
        <img className="logo" src={logo} alt="logo" height="60px" width = "450px" ></img>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <img className="zoinks" src={zoinks} alt="zoinks" width = "120px"></img>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
    <div className='box'>
        <img className="ghost2" src={ghost} alt="ghost2" width = "250px"></img>
        <img className="running_shaggy" src={running_shaggy} alt="running_shaggy" width = "210px"></img>
        <img className="running_scooby" src={running_scooby} alt="running_scooby" width = "250px"></img>
    </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      document.getElementById(a.toString()).classList.add("win");
      document.getElementById(b.toString()).classList.add("win");
      document.getElementById(c.toString()).classList.add("win");
      return squares[a];
    }

  }
  return null;
}

