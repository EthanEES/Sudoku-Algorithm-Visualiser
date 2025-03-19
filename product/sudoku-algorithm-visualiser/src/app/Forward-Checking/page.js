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

    const [solveSpeed, setSolveSpeed] = useState(0);

    const [unknownValues, setunknownValues] = useState([])
    const [numofunknownValues, setnumofunknownValues] = useState(0)

    const [originalDomains, setOriginalDomains] = useState([]);



    function sleep(time) { // Function to delay the program
        
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    function changeSpeed(speed) {
        setSolveSpeed(speed);
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
            input.style.backgroundColor = ""
        });

        refreshDomains();
        setOriginalDomains([]);
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
                    

                    await sleep(0); // Delay of 100ms
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
        originalDomains[index] = [value, [1, 2, 3, 4, 5, 6, 7, 8, 9]]; // Assign numbers 1-9
    }
    
    function constraintProp(value, index, array) {
        getgridAttempt(); 

        let [cell, possibilities] = originalDomains[index];
        let [row, col] = cell;

        let possibilitiesSet = new Set(possibilities);

    
        for (let i = 0; i < gridSize; i++) {
            let gridValue = gridAttempt[row][i];
            possibilitiesSet.delete(gridValue);
        }
    
        for (let i = 0; i < gridSize; i++) {
            let gridValue = gridAttempt[i][col];
            possibilitiesSet.delete(gridValue);
        }
    
        let startRow = row - (row % (subgridSize));
        let startCol = col - (col % (subgridSize));
    
        for (let i = 0; i < subgridSize; i++) {
            for (let j = 0; j < subgridSize; j++) {
                let gridValue = gridAttempt[startRow + i][startCol + j];
                possibilitiesSet.delete(gridValue);
            }
        }
        originalDomains[index][1] = Array.from(possibilitiesSet);
    }

    function refreshDomains() {
        const domains1 = document.getElementById("Domains1");
        const domains2 = document.getElementById("Domains2");

        domains1.innerText = "";
        domains2.innerText = "";
    
        // Split originalDomains into two halves
        const half = Math.ceil(originalDomains.length / 2);
        const firstHalf = originalDomains.slice(0, half);
        const secondHalf = originalDomains.slice(half);
    
        let domainsText1 = "";
        for (let i = 0; i < firstHalf.length; i++) {
            let cell = firstHalf[i][0];
            let possibilities = firstHalf[i][1];
            domainsText1 += `(${cell[0]},${cell[1]}) = ${possibilities}\n`;
        }

        let domainsText2 = "";
        for (let i = 0; i < secondHalf.length; i++) {
            let cell = secondHalf[i][0];
            let possibilities = secondHalf[i][1];
            domainsText2 += `(${cell[0]},${cell[1]}) = ${possibilities}\n`;
        }
    
        // Update the elements with their respective halves
        domains1.innerText = domainsText1;
        domains2.innerText = domainsText2;
    }

    function solveSudoku() { // Backtracking algorithm to solve the sudoku puzzle
        getgridAttempt(); 
        
        unknownValues.forEach(assignDomain)
        originalDomains.forEach(constraintProp);
        console.log(originalDomains); 

        for(let i = 0; i < originalDomains.length; i++){
            if(originalDomains[i][1].length == 1){
                placeValue(originalDomains[i][1][0], originalDomains[i][0][0], originalDomains[i][0][1])
                
            }

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

    async function placeDomains(){
        for (let i = 0; i < originalDomains.length; i++) {
            const gridInputs = document.querySelectorAll("#boxcontent");

            let [current, possibilities] = originalDomains[i];
            let [row, col] = current;
        
            const cell = Array.from(gridInputs).find(
                input =>
                    parseInt(input.getAttribute("data-row")) == row && parseInt(input.getAttribute("data-col")) == col
            );
            
            if(possibilities.length === 1){
                await sleep(solveSpeed)
                cell.value = possibilities[0]
                cell.style.backgroundColor = "orange"
            }
        }

        refreshDomains(); 

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

            if (gridAttempt[row][col] != board[row][col] && Number.isInteger(gridAttempt[row][col])){

                cell.style.backgroundColor = "red"
            }

            else if(gridAttempt[row][col] == board[row][col] && Number.isInteger(gridAttempt[row][col])){
                cell.style.backgroundColor = "green"
                correct += 1;

            }

            else{
                cell.style.backgroundColor = ""

    
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
                        
                        cell.style.backgroundColor = "green"
                        
    
                        await sleep(100); // Delay of 100ms
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
            <div className="grid grid-cols-3 w-screen max-w-[1920px] justify-center items-center h-screen py-28 scale-90">
                <div className="">
                    <div className="pb-10 place-items-center">
                        <h1 className="mb-4 text-3xl font-bold text-white">Algorithm: <p className="inline underline underline-offset-3 decoration-[#8693AB]">Forward Checking (BT)</p></h1>
                        <p className="p-2.5 w-4/5 h-60 text-sm text-gray-50 bg-[#1b212c] border rounded-2xl border-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Praesent sed venenatis metus, ac feugiat quam. Integer 
                            sit amet lorem in lorem cursus aliquet vel tincidunt nisi. 
                            Vestibulum ultrices nisl vel lectus finibus rutrum. Ut ligula 
                            tortor, gravida nec nisi sit amet, aliquam malesuada est. 
                            Integer tempus nec leo eu euismod. Sed ac porttitor justo. 
                        </p>
                    </div>
                    

                    <div className="place-items-center">
                        <h1 className="mb-4 text-3xl font-bold text-white">Complexity: <p className="underline inline underline-offset-3 decoration-[#8693AB]">Time</p></h1>
                        <p className="p-2.5 w-4/5 h-96 text-sm text-gray-50 bg-[#1b212c] border rounded-2xl border-white"></p>
                    
                    </div>
                </div>

                <div id="GridDiv" className="flex flex-col justify-center items-center scale-[120%]">
                    <div className="text-xl font-bold mb-2 underline underline-offset-3 decoration-[#8693AB]">
                        Sudoku
                    </div>
                    <SudokuGrid rows={gridSize} cols={gridSize}/> 
                    {/* <div className="font-5xl mb-2">Timer: 00:00</div>*/}
                    {gridSize} x {gridSize}
                    <button onClick={() => checkGrid(gridSolution)} className="rounded p-2 mr-2 mt-2 bg-[#BDD4E7] text-[#1b212c]">CheckGrid</button>
                    <div className="grid grid-cols-2 scale-90">

                        <button onClick={() => {unknownValues.forEach(assignDomain); refreshDomains()}} className="rounded p-2 mr-2 mt-2 bg-[#BDD4E7] text-[#1b212c]">1. Assign Domain</button>
                        <button onClick={() => {originalDomains.forEach(constraintProp); refreshDomains() }} className="rounded p-2 mr-2 mt-2 bg-[#BDD4E7] text-[#1b212c]">2. ConstraintProp</button>
                        <button onClick={() => {placeDomains(); refreshDomains() }} className="rounded p-2 mr-2 mt-2 bg-[#BDD4E7] text-[#1b212c]">3. Place Values</button>
                        <button onClick={() => {originalDomains.forEach(constraintProp); refreshDomains() }} className="rounded p-2 mr-2 mt-2 bg-[#BDD4E7] text-[#1b212c]">4. Backtrack</button>


                    </div>
                    



                </div>

                <div className="place-items-center">
                        <h1 className="mb-4 text-3xl font-bold text-white"><p className="underline inline underline-offset-3 decoration-[#8693AB]">Current Domains:</p></h1>
                        <div className="grid grid-cols-2 p-2.5 w-4/5 h-108 pb-60 text-sm text-gray-50 bg-[#1b212c] border rounded-2xl border-white">
                            <p id="Domains1" className="p-2.5 h-96 text-sm text-gray-50">
                            </p>
                            <p id="Domains2" className="p-2.5 h-96 text-sm text-gray-50 ">
                            </p>

                        </div>
                        
                    
                </div>

                
                
                
            </div>

            

            
            
        </div>
    );
  }