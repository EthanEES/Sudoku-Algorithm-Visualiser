"use client";
import React, { useState } from "react";
import SudokuGrid from "../../components/sudokugrid";

export default function Page() {

    const [gridSize] = useState(8);

    function isSafe(board, row, col) {
        // Checks if there is a queen to the left of the current position in the same row 
        for (let x = 0; x < col; x++) {
            if (board[row][x] == 1) {
                return false;
            }
        }

        // Checks if there is a queen in the upper left diagonal of the current position in the same row 
        for (let x = row, y = col; x >= 0 && y >= 0; x--, y--) {
            if (board[x][y] == 1) {
                return false;
            }
        }

        // Checks if there is a queen in the lower left diagonal of the current position in the same row 
        for (let x = row, y = col; x < gridSize && y >= 0; x++, y--) {
            if (board[x][y] == 1) {
                return false;
            }
        }

        return true;
    }

    function clearGrid() {
        const gridInputs = document.querySelectorAll("#boxcontent"); // Selects all input elements by their ID
        gridInputs.forEach((input) => {
            input.className = " text-xl dark:bg-[#1b212c] h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            input.value = ""; // Clears the values of cells
        });
    }

    function generateQueens() {
    }
    
    



    return (
        <div className="flex font-spacegrotesk">
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" ></link>
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Tourney:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>

            

            <header className="flex items-center w-full bg-white dark:bg-[#1b212c] justify-between py-5 px-5 rounded-b-2xl ">
                <a className="break-words">
                    <div className="flex items-center justify-between">
                        <div className="max-w-16 ">
                            <img className="" src="/Su.png" alt="image description"></img>
                        </div>
                        <div className="h-6 text-xl font-semibold sm:block ">Sudoku Algorithm Visualiser</div>
                    </div>
                </a>
                <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                    <div className="flex pl-10">
                        <button onClick={generateQueens} className="border-2 rounded p-2 mr-2 hover:bg-[#313c50]">GenerateQueens</button>
                        <button onClick={clearGrid} className="border-2 rounded p-2 mr-2 hover:bg-[#313c50]">ClearGrid</button>
                        <button onClick={() => window.location.href = '/'} className="border-2 rounded p-2 hover:bg-[#313c50]">Sudoku</button>


                    </div>
                </div>
            </header>
            <div id="GridDiv" className=" scale-125 flex flex-col fixed justify-center items-center w-[30%] h-full ml-[35vw] mt-10 ">
                <div className="font-5xl mb-2">8 Queens Problem</div>
                <SudokuGrid rows={gridSize} cols={gridSize}/>
                {gridSize} x {gridSize}


            </div>
            
        </div>
    );
  }