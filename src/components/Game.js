import React from 'react'
import { useState } from "react";
import Square from './Square';
import { useLocation } from 'react-router-dom';
import {generateArray, generateRandom} from '../utils/helper';


const Game = () => {


    // Get Names of Players
    const { state } = useLocation()



    // Define State Variables

    //Run only first time due to syntax
    const [turn, setTurn] = useState(() => {
        return generateRandom(0, 1)
    })

    // Run only first time due to syntax
    const [board, setBoard] = useState(() => {
        return generateArray(state.gridSize,state.gridSize)
    })

    const [winner, setWinner] = useState("")



    // Get Player Name
    const getPlayerName = (id) => {
        return id === "O" ? state.playerOneName : state.playerTwoName
    }



    // CheckWinner
    const isWinner = () => {

        // Extract Rows and Columns to check the uniqueness in them.
        // If the Row contain only one element then it means the player who put last symbol wins
        var mainDiagonalList = []
        var secondaryDiagonalList = []

        // Row Loop
        for (let row = 0; row < state.gridSize; row++) {
            var rowList = []
            var colList = []

            // Column Loop
            for (let col = 0; col < state.gridSize; col++) {

                // Put elements one by one to make a single row/column
                rowList.push(board[row][col])
                colList.push(board[col][row])


                // Main Diagonal Condition
                if (row === col) {
                    mainDiagonalList.push(board[col][row])
                }

                // Secondary Diagonal Condition
                if (Math.abs(row + col) === state.gridSize-1) {
                    secondaryDiagonalList.push(board[col][row])
                }
            }


            // Check Uniqueness in the Row
            if (new Set(rowList).size === 1 && rowList[0] !== 0) {
                setWinner(getPlayerName(rowList[0]))
                break
            }

            // Check Uniqueness in the Column
            if (new Set(colList).size === 1 && colList[0] !== 0) {
                setWinner(getPlayerName(colList[0]))
                break
            }
        }

        // Check Uniqueness in Main Diaglonal
        if (new Set(mainDiagonalList).size === 1 && mainDiagonalList[0] !== 0) {
            setWinner(getPlayerName(mainDiagonalList[0]))
        }


        // Check Uniqueness in Secondary Diaglonal
        if (new Set(secondaryDiagonalList).size === 1 && secondaryDiagonalList[0] !== 0) {
            setWinner(getPlayerName(secondaryDiagonalList[0]))
        }
    }



    // 
    const onClick = ({ index }) => {

        if (winner === "") {

            // Update the board when click is pressed
            var newArray = [...board]
            newArray[index[0]][index[1]] = turn === 1 ? "O" : "X"
            setBoard(newArray)


            // Check Winner
            isWinner()

            //Print Board in console
            console.log(board)


            // Update Turn
            setTurn(turn === 1 ? 2 : 1)
            
        }
    }

    return (
        <div className="container">
            <h1 >Player {turn}: {turn === 1 ? state.playerOneName : state.playerTwoName}</h1>
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
