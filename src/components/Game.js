import React from 'react'
import { useState } from "react";
import Square from './Square';
import { useLocation } from 'react-router-dom';



const generateRandom = (min, max) => {
    return Math.round(min + Math.random() * (max - min)) + max
}

const generateArray = (rows,columns) => {
    var array = []
        for (let row = 0; row < rows; row++) {
            array.push([])
            for (let column = 0; column < columns; column++) {
                array[row].push(0)
            }
        }
        return array
}

const Game = () => {


    // Get Names of Players
    const { state } = useLocation()



    // Define State Variables
    const [turn, setTurn] = useState(generateRandom(0, 1))
    const [winner, setWinner] = useState("")
    const [board, setBoard] = useState(generateArray(state.gridSize,state.gridSize))


    const getPlayerName = (id) => {
        return id === "O" ? state.playerOneName : state.playerTwoName
    }



    // CheckWinner
    const isWinner = () => {
        var mainDiagonalList = []
        var secondaryDiagonalList = []
        for (let row = 0; row < state.gridSize; row++) {
            var rowList = []
            var colList = []
            for (let col = 0; col < state.gridSize; col++) {

                rowList.push(board[row][col])
                colList.push(board[col][row])

                if (row === col) {
                    mainDiagonalList.push(board[col][row])
                }
                if (Math.abs(row + col) === state.gridSize-1) {
                    secondaryDiagonalList.push(board[col][row])
                }
            }

            if (new Set(rowList).size === 1 && rowList[0] !== 0) {
                setWinner(getPlayerName(rowList[0]))
                break
            }
            if (new Set(colList).size === 1 && colList[0] !== 0) {
                setWinner(getPlayerName(colList[0]))
                break
            }
        }
        if (new Set(mainDiagonalList).size === 1 && mainDiagonalList[0] !== 0) {
            setWinner(getPlayerName(mainDiagonalList[0]))
        }
        if (new Set(secondaryDiagonalList).size === 1 && secondaryDiagonalList[0] !== 0) {
            setWinner(getPlayerName(secondaryDiagonalList[0]))
        }
    }



    // 
    const onClick = ({ index }) => {

        if (winner === "") {
            var newArray = [...board]
            newArray[index[0]][index[1]] = turn === 1 ? "O" : "X"
            setBoard(newArray)


            // Check Winner
            isWinner()

            //Print Board in console
            console.log(board)
            setTurn(turn === 1 ? 2 : 1)
            
        }
    }

    return (
        <div className="container">
            <h1>Player {turn}: {turn === 1 ? state.playerOneName : state.playerTwoName}</h1>
            {
                board.map((row, indexRow) => {
                    return row.map((element, indexElement) => {
                        const placeHolder = <Square index={[indexRow, indexElement]} value={board[indexRow][indexElement]} onClick={onClick} />
                        if (indexElement === state.gridSize-1) {
                            return (
                                <>
                                    {placeHolder}
                                    <br />
                                </>
                            )
                        } else {
                            return placeHolder
                        }
                    })
                })
            }
            {winner !== "" && <h2>Winner is {winner}</h2>}
        </div>

    )
}

export default Game
