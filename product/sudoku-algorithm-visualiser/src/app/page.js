"use client";
import React, { useState } from "react";
import SudokuGrid from "../components/sudokugrid";

export default function Page() {

    const [gridSize, setGridSize] = useState(9);
    const [subgridSize, setsubgridSize] = useState(3)
    
    const [gridSolution, setgridSolution] = useState([])
    const [gridProblem, setgridProblem] = useState([])
    const [gridAttempt, setgridAttempt] = useState([])

    const [lives, setlives] = useState(3)

    const [unknownValues, setunknownValues] = useState([])

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
        setlives(3);
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

        let grid = JSON.parse(JSON.stringify(board));
        let unknowns = [];
        


        for (let i = 0; i < gridSize; i++) {
            let row = (i) % gridSize;
            for (let j = 0; j < gridSize; j++) {
                let col = (j) % gridSize;
                

                    const cell = Array.from(gridInputs).find(
                        input =>
                            parseInt(input.getAttribute("data-row")) == row && parseInt(input.getAttribute("data-col")) == col
                    );

                    let prob = Math.floor(Math.random() * 100)
                    if (prob < 40){
                        cell.value = board[row][col]
                        cell.readOnly = true;

                    }
                    else{
                        grid[row][col] = 0
                        cell.value = 0
                        cell.className = "blur text-xl dark:bg-[#1b212c] h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        unknowns.push([row, col])
                    }
                    

                    await sleep(50); // Delay of 100ms
            }
        }

        setunknownValues(unknowns)
        setgridSolution(board)
        setgridProblem(grid)
        

        removeGridValues(unknowns, gridInputs)
    }

    function removeGridValues(unknownvalues, gridInputs){
        for (let i = 0; i < unknownvalues.length; i++) {
            let row = unknownvalues[i][0];
            let col = unknownvalues[i][1];

            const cell = Array.from(gridInputs).find(
                input =>
                    parseInt(input.getAttribute("data-row")) == row && parseInt(input.getAttribute("data-col")) == col
            );
            
            cell.value = ""
            cell.className = "text-xl dark:bg-[#1b212c] h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            cell.readOnly = false;

        }
    }
    
    function checkforDupes(board, row, col, value) {
    
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
        
        const startRow = row - (row % (subgridSize)),
          startCol = col - (col % (subgridSize));

        for (let i = 0; i < subgridSize; i++)
            for (let j = 0; j < subgridSize; j++)
                if (board[i + startRow][j + startCol] === value)
                    return true;
    
        return false; // No duplicates found
    }
    
    function sizeGrid() {
        clearGrid()

        switch(subgridSize){
            case 3:
                setsubgridSize(4)
                setGridSize(16)
                break;

            case 4:
                setsubgridSize(3)
                setGridSize(9)
                break;

        }        
    }


    function backtrack(){

    }

    async function checkGrid(board){
        const gridInputs = document.querySelectorAll("#boxcontent");
        const attempt = Array.from({ length: gridSize }, () => Array(gridSize).fill(0))

        for (let i = 0; i < gridSize; i++) {
            let row = (i) % gridSize;
            for (let j = 0; j < gridSize; j++) {
                let col = (j) % gridSize;
                

                    const cell = Array.from(gridInputs).find(
                        input =>
                            parseInt(input.getAttribute("data-row")) == row && parseInt(input.getAttribute("data-col")) == col
                    );

                    attempt[row][col] = parseInt(cell.value)

                    
                    
            }
        }

        console.log(unknownValues)
        console.log(gridSolution)
        console.log(gridProblem)

        for (let i = 0; i < unknownValues.length; i++) {
            let row = unknownValues[i][0];
            let col = unknownValues[i][1];

            const cell = Array.from(gridInputs).find(
                input =>
                    parseInt(input.getAttribute("data-row")) == row && parseInt(input.getAttribute("data-col")) == col
            );

            if (lives > 1){
                if (attempt[row][col] != board[row][col] && Number.isInteger(attempt[row][col])){

                    cell.className = "bg-red-600 text-xl h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    setlives(prevlives => prevlives - 1);
                }
    
                else{
                    cell.className = "text-xl dark:bg-[#1b212c] h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      
                }

            }

            else{
                for (let i = 0; i < gridSize; i++) {
                    let row = (i) % gridSize;
                    for (let j = 0; j < gridSize; j++) {
                        let col = (j) % gridSize;
                        
        
                            const cell = Array.from(gridInputs).find(
                                input =>
                                    parseInt(input.getAttribute("data-row")) == row && parseInt(input.getAttribute("data-col")) == col
                            );
                            

                            let prob = Math.floor(Math.random() * 100)
                            if (prob < 50){
                                cell.value = 0
                            }
                            else{
                                cell.value = 1
                            }
                            
                            cell.className = "text-xl bg-red-600 h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            
        
                            await sleep(50); // Delay of 100ms
                    }

                }
                clearGrid()
                break
            }

        }

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
            <div id="GridDiv" className=" scale-115 flex flex-col fixed justify-center items-center w-[30%] h-full ml-[35vw] mt-10 ">
            <div className="font-5xl mb-2">Sudoku</div>
                <SudokuGrid rows={gridSize} cols={gridSize}/> 
                {/* <div className="font-5xl mb-2">Timer: 00:00</div>*/}
                {gridSize} x {gridSize}

                <button onClick={() => checkGrid(gridSolution)} className="border-2 rounded p-2 mt-5 mr-2 hover:bg-[#313c50]">CheckGrid</button>
                <button className="inline border-2 rounded p-2 mt-5 mr-2">Lives Remaining = {lives}</button>

            </div>
            
        </div>
    );
  }