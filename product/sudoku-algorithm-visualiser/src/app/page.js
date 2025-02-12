"use client";
import React, { useState } from "react";
import SudokuGrid from "../components/sudokugrid";

export default function Page() {

    const [gridSize, setGridSize] = useState(9);

    function sleep(time) {
        
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    function clearGrid() {
        const gridInputs = document.querySelectorAll("#boxcontent"); // Selects all input elements by their ID
        gridInputs.forEach(input => {
            input.value = ""; // Clears the values of cell
            input.className = "text-xl dark:bg-[#1b212c] h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
        });
    }

    async function generateGrid() {
        clearGrid(); // Assuming this function resets the grid
        const gridInputs = document.querySelectorAll("#boxcontent");
    
        const board = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    
        const maxAttempts = 1000; // Prevent infinite loops
    
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                let temp_value = Math.floor(Math.random() * gridSize) + 1;
                let attempts = 0;
                

                while (checkforDupes(board, row, col, temp_value)){
                    temp_value = Math.floor(Math.random() * gridSize) + 1;
                    attempts++;
    
                    if (attempts > maxAttempts) {
                        return generateGrid(); // Restart the process
                    }
                }

                
    
                board[row][col] = temp_value;
            }
        }
    
        for(let i = 0; i < 60; i++){
            let randx = Math.floor(Math.random() * gridSize)
            let randy = Math.floor(Math.random() * gridSize)
            const cell = Array.from(gridInputs).find(
                input =>
                    parseInt(input.getAttribute("data-row")) == randx && parseInt(input.getAttribute("data-col")) == randy
                
            );



        }

        for (let i = 0; i < gridSize; i++) {
            let row = (i) % gridSize;
            for (let i = 0; i < gridSize; i++) {
                let col = (i) % gridSize;
                

                    const cell = Array.from(gridInputs).find(
                        input =>
                            parseInt(input.getAttribute("data-row")) == row && parseInt(input.getAttribute("data-col")) == col
                    );

                    let prob = Math.floor(Math.random() * 100)
                    console.log(prob)
                    if (prob < 40){
                        cell.value = board[row][col]
                    }
                    else{
                        cell.value = 0
                        cell.className = "blur text-xl dark:bg-[#1b212c] h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    }
                    

                    await sleep(100); // Delay of 100ms
            }
        }

        console.log(board); // Display the filled board

    }
    
    function checkforDupes(board, row, col, value) {
        const gridSize = board.length;
    
        for (let i = 0; i < gridSize; i++) {
            if (board[row][i] === value) {
                return true;
            }
        }
    
        for (let i = 0; i < gridSize; i++) {
            if (board[i][col] === value) {
                return true;
            }
        }
        
        const startRow = row - (row % 3),
          startCol = col - (col % 3);

        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (board[i + startRow][j + startCol] === value)
                    return true;
    
        return false; // No duplicates found
    }
    
    


    function sizeGrid() {
        clearGrid()
        // If the grid size is 15, reset to 9
        setGridSize((prevSize) => (prevSize === 15 ? 9 : prevSize + 3));
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
                        <button onClick={generateGrid} className="border-2 rounded p-2 mr-2 hover:bg-[#313c50]">GenerateGrid</button>
                        <button onClick={sizeGrid} className="border-2 rounded p-2 mr-2 hover:bg-[#313c50]">SizeGrid</button>
                        <button onClick={clearGrid} className="border-2 rounded p-2 mr-2 hover:bg-[#313c50]">ClearGrid</button>
                        <button onClick={() => window.location.href = '/8Queens'} className="border-2 rounded p-2 hover:bg-[#313c50]">8Queens</button>


                    </div>
                    </div>
            </header>
            <div id="GridDiv" className=" scale-125 flex flex-col fixed justify-center items-center w-[30%] h-full ml-[35vw] mt-10 ">
            <div className="font-5xl mb-2">Sudoku</div>
                <SudokuGrid rows={gridSize} cols={gridSize}/> 
                {/* <div className="font-5xl mb-2">Timer: 00:00</div>*/}
                {gridSize} x {gridSize}

            </div>
            
        </div>
    );
  }