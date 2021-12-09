import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Intro = () => {
    let navigate = useNavigate();
    const [playerOne,setPlayerOne] = useState("")
    const [playerTwo,setPlayerTwo] = useState("")
    const [gridSize,setGridSize] = useState(3)
    const onSubmit = (e) =>{
        e.preventDefault()
        console.log(playerOne)
        navigate('/game', 
           {
               state:{
                playerOneName: playerOne,
                playerTwoName: playerTwo,
                gridSize:gridSize
               }
          });
    }

    return (
        <div className="container">
            <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Player 1</label>
                <input type="text" placeholder="Name" value={playerOne} onChange={(e) => setPlayerOne(e.target.value)} />
                <label>Player 2</label>
                <input type="text" placeholder="Name" value={playerTwo} onChange={(e) => setPlayerTwo(e.target.value)} />
                <label>Player 2</label>
                <input type="number" placeholder="Grid Size" value={gridSize} onChange={(e) => setGridSize(e.target.value)} />

                <label>Instructions</label>
                <p>Player 1 symbol  "O" <br/> Player 2 symbol "X"</p>
            </div>
            <input type="submit" value="Play" className="btn btn-block"/>
            </form>
        </div>
    )
}

export default Intro
