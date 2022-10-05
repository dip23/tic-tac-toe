import React, { useEffect, useState } from 'react';
import style from './styles.module.css';
import o from '../assets/o.png';
import x from '../assets/x.png';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(x);
  const [status, setStatus] = useState({
    player1: 0,
    player2: 0,
    tie: 0
  });

  const calculateWinner = (squares) => {
    const winningPatterns = [
      [0,1,2], //horizontal 
      [3,4,5], //horizontal
      [6,7,8], //horizontal
      [0,3,6], //vertical
      [1,4,7], //vertical
      [2,5,8], //vertical
      [0,4,8], //diagonal
      [2,4,6] //diagonal
    ];

    for (let i=0; i<winningPatterns.length; i++) {
      const [a,b,c] = winningPatterns[i]

      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }

    return null;
  }

  const handleClick = (i) => {
    if(calculateWinner(squares) || squares[i]) {
      return
    }

    if(squares[i]){
      alert('not empty')
    }else{
      const newSquares = [...squares]
      newSquares[i] = isX ? x : o
      setSquares(newSquares)
      setIsX((v)=>!v)
    }
  }

  //decide the winner
  useEffect(() => {
    const winner = calculateWinner(squares)
    if(winner === x){
      setStatus({
        ...status,
        player1: status.player1+1
      })
      setSquares(Array(9).fill(null));
    }else if(winner === o){
      setStatus({
        ...status,
        player2: status.player2+1
      })
      setSquares(Array(9).fill(null));
    }
  }, [isX])

  useEffect(() => {
    if((status.player1 === status.player2) && (status.player1 || status.player2)){
      setStatus({
        ...status,
        tie: status.tie+1
      })
    }
  }, [status.player1, status.player2])

  return (
    <div className={style.root}>
        <p>Tic Tac Toe</p>
        <div>
            <Square value={squares[0]} onClick={()=>handleClick(0)}/>
            <Square value={squares[1]} onClick={()=>handleClick(1)}/>
            <Square value={squares[2]} onClick={()=>handleClick(2)}/>
        </div>
        <div>
            <Square value={squares[3]} onClick={()=>handleClick(3)}/>
            <Square value={squares[4]} onClick={()=>handleClick(4)}/>
            <Square value={squares[5]} onClick={()=>handleClick(5)}/>
        </div>
        <div>
            <Square value={squares[6]} onClick={()=>handleClick(6)}/>
            <Square value={squares[7]} onClick={()=>handleClick(7)}/>
            <Square value={squares[8]} onClick={()=>handleClick(8)}/>
        </div>
        <div>
          <div>
            <p>Player 1 (x)</p>
            {status.player1}
          </div>
          <div>
            <p>Tie</p>
            {status.tie}
          </div>
          <div>
            <p>Player 2 (o)</p>
            {status.player2}
          </div>
        </div>
    </div>
  )
}

function Square({value, onClick}) {
    return (
        <button className={style.square} onClick={onClick}>
            {value && <img alt='val' src={value}/>}
        </button>
    )
}