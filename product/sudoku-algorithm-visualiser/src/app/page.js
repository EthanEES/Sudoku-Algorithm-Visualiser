"use client";
import React, { useState } from "react";
import SudokuGrid from "../components/sudokugrid";

export default function Page() {

    const [gridSize, setGridSize] = useState(9);
    const [subgridSize, setsubgridSize] = useState(3)
    
    const [gridSolution, setgridSolution] = useState([])
    const [gridProblem, setgridProblem] = useState([])
    let gridAttempt = [];

    const [lives, setlives] = useState(3)

    const [unknownValues, setunknownValues] = useState([])
    const [numofunknownValues, setnumofunknownValues] = useState(0)
    
    const [isAlgorithmsOpen, setIsAlgorithmsOpen] = useState(false);
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const [isSpeedOpen, setIsSpeedOpen] = useState(false);



    function sleep(time) { // Function to delay the program
        
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    function clearGrid() { // Function to clear the grid displayed on the webpage
        setlives(3);
        const gridInputs = document.querySelectorAll("#boxcontent"); // Selects all input elements by their ID
        gridInputs.forEach(input => {
            input.value = ""; // Clears the values of cell
            input.className = "text-xl dark:bg-[#1b212c] h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
        });

    }

    async function generateGrid() { // Function to generate the sudoku grid and display on the page
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
                    if (prob < 50){
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
        setnumofunknownValues(unknowns.length)

        setunknownValues(unknowns)
        setgridSolution(board)
        setgridProblem(grid)

        removeGridValues(unknowns, gridInputs)
    }

    function removeGridValues(unknownvalues, gridInputs) { // Removes some of the sudoku values from the solved puzzle
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
    
    function checkforDupes(board, row, col, value) { // Various sudoku conditions that are checked returning true if duplicates are found
    
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
    
    function sizeGrid() { // Change the gridsize altering the global variables
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

    function getgridAttempt(){ // Traverses and saves the displayed grid with both the user inputs + generated grid
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

        gridAttempt = attempt
    }


    async function solveSudoku() { // Backtracking algorithm to solve the sudoku puzzle
        getgridAttempt();
        
        async function solve(index) {
            if (index >= unknownValues.length) {
                return true;
            }
    
            let [row, col] = unknownValues[index];
    
            for (let num = 1; num <= gridSize; num++) {
                console.log(gridAttempt, row, col, num);
                if (!checkforDupes(gridAttempt, row, col, num)) {
                    gridAttempt[row][col] = num;

                    await placeValue(num, row, col);
                    await sleep(20);
    
                    if (await solve(index + 1)) {
                        return true;
                    }
                    gridAttempt[row][col] = 0; // 
                    
                    await placeValue(0, row, col);
                    await sleep(20);
                }
            }
            return false;
        }
    
        if (await solve(0)) {
            console.log("Sudoku solved");
        } else {
            console.log("No solution exists.");
        }
    }
    
    async function placeValue(num, row, col) { // Places the passed values into the displayed grid
        const gridInputs = document.querySelectorAll("#boxcontent");
    
        const cell = Array.from(gridInputs).find(
            input =>
                parseInt(input.getAttribute("data-row")) == row && parseInt(input.getAttribute("data-col")) == col
        );
        
        if(num == 0){
            cell.value = ""
        }
        else{
            cell.value = num;
        }

        if (num === 0) {
            cell.style.backgroundColor = "#ffcccc"; // Light red for backtracking
        } else {
            cell.style.backgroundColor = "#ccffcc"; // Light green for placing a number
        }

        await sleep(20);
        cell.style.backgroundColor = "";
    }
    
    async function checkGrid(board){ // Checks if the attempt matches the solution and displays if its wrong
        const gridInputs = document.querySelectorAll("#boxcontent");
        const attempt = Array.from({ length: gridSize }, () => Array(gridSize).fill(0))
        let correct = 0;

        getgridAttempt()

        for (let i = 0; i < unknownValues.length; i++) {
            let row = unknownValues[i][0];
            let col = unknownValues[i][1];

            const cell = Array.from(gridInputs).find(
                input =>
                    parseInt(input.getAttribute("data-row")) == row && parseInt(input.getAttribute("data-col")) == col
            );

            if (lives > 1){
                if (gridAttempt[row][col] != board[row][col] && Number.isInteger(gridAttempt[row][col])){

                    cell.className = "bg-red-600 text-xl h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    setlives(prevlives => prevlives - 1);
                }

                else if(gridAttempt[row][col] == board[row][col] && Number.isInteger(gridAttempt[row][col])){
                    cell.className = "text-xl bg-green-900 h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    correct += 1;

                }
    
                else{
                    cell.className = "text-xl dark:bg-[#1b212c] h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

      
                }

            }

            else{
                //End Screen
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

        if (correct >= numofunknownValues){
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
                        
                        cell.className = "text-xl bg-green-600 h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        
    
                        await sleep(50); // Delay of 100ms
                }

            }
            clearGrid()
        
        }

    }


    return (
        <div className="flex font-spacegrotesk">
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" ></link>
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Tourney:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>

            

            <nav className="flex items-center w-full bg-white dark:bg-[#1b212c] justify-between py-5 px-5 rounded-b-2xl ">
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
                        <div id="AlgosDropdown" className="relative rounded p-2 mr-2 hover:bg-[#313c50]">
                            <button onClick={() => setIsAlgorithmsOpen(!isAlgorithmsOpen)} className="" aria-expanded={isAlgorithmsOpen}>
                                Algorithms ▼
                            </button>
                            {isAlgorithmsOpen && (
                                <ul className="absolute mt-2 bg-white dark:bg-gray-800 border rounded">
                                    {["Backtracking", "Breadth-first Search", "Depth-first Search"].map((algo, index) => (
                                        <button key={index} onClick={() => window.location.href = "/"+ algo} className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-nowrap">
                                            <a>{algo}</a>
                                        </button>
                                    ))}
                                </ul>
                            )}

                        </div>
                        <button onClick={generateGrid} className=" rounded p-2 mr-2 hover:bg-[#313c50]">GenerateGrid</button>
                        <button onClick={sizeGrid} className=" rounded p-2 mr-2 hover:bg-[#313c50]">SizeGrid</button>
                        <button onClick={() => solveSudoku()} className=" rounded p-2 mr-2 bg-[#BDD4E7] text-[#1b212c]">Visualise!</button>
                        <div id="SpeedDropdown" className="relative rounded p-2 mr-2 hover:bg-[#313c50]">
                            <button onClick={() => setIsSpeedOpen(!isSpeedOpen)} className="">
                                Speed: Fast ▼
                            </button>
                            {isSpeedOpen && (
                                <ul className="absolute mt-2 dark:bg-gray-800 border rounded">
                                    {["Slow", "Medium", "Fast", "Fastest"].map((speed, index) => (
                                        <button key={index} className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                                            <a>{speed}</a>
                                        </button>
                                    ))}
                                </ul>
                            )}

                        </div>
                        <button onClick={clearGrid} className=" rounded p-2 mr-2 hover:bg-[#313c50]">Clear Grid</button>
                        <div id="OtherDropdown" className="relative rounded p-2 mr-3 hover:bg-[#313c50]">
                            <button onClick={() => setIsOtherOpen(!isOtherOpen)} className="" aria-expanded={isOtherOpen}>
                                Other ▼
                            </button>
                            {isOtherOpen && (
                                <ul className="absolute mt-2  bg-white dark:bg-gray-800 border rounded">
                                    {["8Queens"].map((other, index) => (
                                        <button key={index} onClick={() => window.location.href = "/"+ other} className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                                            <a>{other}</a>
                                        </button>
                                    ))}
                                </ul>
                            )}

                        </div>


                    </div>
                    </div>
            </nav>
            <div id="GridDiv" className=" scale-115 flex flex-col fixed justify-center items-center w-[30%] h-full ml-[35vw] mt-10 ">
            <div className="font-5xl mb-2">Sudoku</div>
                <SudokuGrid rows={gridSize} cols={gridSize}/> 
                {/* <div className="font-5xl mb-2">Timer: 00:00</div>*/}
                {gridSize} x {gridSize}

                <button onClick={() => checkGrid(gridSolution)} className="border-2 rounded p-2 mt-5 mr-2 hover:bg-[#313c50]">CheckGrid</button>
                <a className="inline border-2 rounded p-2 mt-5 mr-2">Lives Remaining = {lives}</a>

            </div>
            
        </div>
    );
  }