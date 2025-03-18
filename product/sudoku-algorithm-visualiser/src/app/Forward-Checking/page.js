"use client";
import React, { useState } from "react";
import SudokuGrid from "../../components/sudokugrid";
import AlgosNavbar from "../../components/algosNavbar";


export default function Page() {

    const [isFunctionRunning, setIsFunctionRunning] = useState(false);

    const [gridSize, setGridSize] = useState(9);
    const [subgridSize, setsubgridSize] = useState(3)
    
    const [gridSolution, setgridSolution] = useState([])
    const [gridProblem, setgridProblem] = useState([])
    let gridAttempt = [];

    const [lives, setlives] = useState(3)

    let solveSpeed = 0;

    const [unknownValues, setunknownValues] = useState([])
    const [numofunknownValues, setnumofunknownValues] = useState(0)

    const [unknownPossibilities, setunknownPossibilities] = useState([])



    function sleep(time) { // Function to delay the program
        
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    function changeSpeed(speed){
        solveSpeed = speed;
    }

    async function longFunction(func) {
        setIsFunctionRunning(true); // Show overlay
        await func(); // Wait for function fo finish
        setIsFunctionRunning(false); // Hide overlay
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

    function assignDomain(value, index, array) {
        unknownPossibilities[index] = [value, [1, 2, 3, 4, 5, 6, 7, 8, 9]]; // Assign numbers 1-9
    }
    
    function constraintProp(value, index, array) {
        let [cell, possibilities] = unknownPossibilities[index];
        let [row, col] = cell;
    
        for (let i = 0; i < gridSize; i++) {
            let gridValue = gridAttempt[row][i];
            if (possibilities.includes(gridValue)) {
                possibilities.splice(possibilities.indexOf(gridValue), 1);
            }
        }
    
        for (let i = 0; i < gridSize; i++) {
            let gridValue = gridAttempt[i][col];
            if (possibilities.includes(gridValue)) {
                possibilities.splice(possibilities.indexOf(gridValue), 1);
            }
        }
    
        let startRow = row - (row % (subgridSize));
        let startCol = col - (col % (subgridSize));
    
        for (let i = 0; i < subgridSize; i++) {
            for (let j = 0; j < subgridSize; j++) {
                let gridValue = gridAttempt[startRow + i][startCol + j];
                if (possibilities.includes(gridValue)) {
                    possibilities.splice(possibilities.indexOf(gridValue), 1);
                }
            }
        }
    }
    
    async function solveSudoku() { // Backtracking algorithm to solve the sudoku puzzle
        getgridAttempt(); 
        setunknownPossibilities([])
        
        unknownValues.forEach(assignDomain);
        unknownPossibilities.forEach(constraintProp);
        console.log(unknownPossibilities); // Log the assigned possibilities

        async function solve(index) {
            if (index >= unknownPossibilities.length) { // Check if the recursion has passed the last unknown value.
                return true;
            }
    
            let [row, col] = unknownPossibilities[index][0];
            let possibleNumbers = unknownPossibilities[index][1];
    
            for (let num of possibleNumbers) {
                if (!checkforDupes(gridAttempt, row, col, num)) {
                    gridAttempt[row][col] = num;

                    await placeValue(num, row, col);
                    await sleep(solveSpeed);
    
                    if (await solve(index + 1)) {
                        return true;
                    }
                    gridAttempt[row][col] = 0; // 
                    
                    await placeValue(0, row, col);
                    await sleep(solveSpeed);
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

        await sleep(solveSpeed);
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
        <div className="flex font-spacegrotesk justify-center">
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" ></link>
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Tourney:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>

            {isFunctionRunning && (
                <div className="absolute w-full h-full opacity-0 z-50 pointer-events-auto" />
            )}

            
            <AlgosNavbar generateGrid={generateGrid} sizeGrid={sizeGrid} solveSudoku={solveSudoku} clearGrid={clearGrid} checkGrid={checkGrid} longFunction={longFunction} changeSpeed={changeSpeed}/>
            <div className="grid grid-cols-2 w-screen max-w-[1920px] justify-center items-center h-screen py-28">
                <div className="pl-16">
                    <div className="pb-10 place-items-start">
                        <h1 className="mb-4 text-3xl font-bold text-white">Algorithm: <p className="inline underline underline-offset-3 decoration-[#8693AB]">Forward Checking (BT)</p></h1>
                        <p className="p-2.5 w-2/3 h-60 text-sm text-gray-50 bg-[#1b212c] border rounded-2xl border-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Praesent sed venenatis metus, ac feugiat quam. Integer 
                            sit amet lorem in lorem cursus aliquet vel tincidunt nisi. 
                            Vestibulum ultrices nisl vel lectus finibus rutrum. Ut ligula 
                            tortor, gravida nec nisi sit amet, aliquam malesuada est. 
                            Integer tempus nec leo eu euismod. Sed ac porttitor justo. 
                        </p>
                    </div>
                    

                    <div className="place-items-start">
                        <h1 className="mb-4 text-3xl font-bold text-white">Complexity: <p className="underline inline underline-offset-3 decoration-[#8693AB]">Time</p></h1>
                        <p className="p-2.5 w-2/3 h-96 text-sm text-gray-50 bg-[#1b212c] border rounded-2xl border-white"></p>
                    
                    </div>
                </div>

                <div id="GridDiv" className="flex flex-col justify-center items-center mr-52 scale-[120%]">
                    <div className="text-xl font-bold mb-2 underline underline-offset-3 decoration-[#8693AB]">
                        Sudoku
                    </div>
                    <SudokuGrid rows={gridSize} cols={gridSize}/> 
                    {/* <div className="font-5xl mb-2">Timer: 00:00</div>*/}
                    {gridSize} x {gridSize}
                    <button onClick={() => checkGrid(gridSolution)} className="rounded p-2 mr-2 mt-2 bg-[#BDD4E7] text-[#1b212c]">CheckGrid</button>


                </div>

                
            </div>

            

            
            
        </div>
    );
  }