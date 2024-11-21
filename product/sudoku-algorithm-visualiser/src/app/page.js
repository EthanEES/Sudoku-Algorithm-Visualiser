"use client";
import React, { useState } from "react";
import SudokuGrid from "../components/sudokugrid";

export default function Page() {

    const [gridSize, setGridSize] = useState(9);

    function clearGrid() {
        const gridInputs = document.querySelectorAll("#boxcontent"); // Selects all input elements by their ID
        gridInputs.forEach(input => {
            input.value = ""; // Clears the values of cell
        });
    }

    function generateGrid() {
        const gridInputs = document.querySelectorAll("#boxcontent"); // Selects all input elements by their ID
        gridInputs.forEach(input => {
            input.value = Math.floor(Math.random() * 10); // Clears the values of cell
        });
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
                        <button onClick={clearGrid} className="border-2 rounded p-2 hover:bg-[#313c50]">ClearGrid</button>

                    </div>
                    </div>
            </header>
            <div id="GridDiv" className=" scale-125 flex flex-col fixed justify-center items-center w-[30%] h-full ml-[35vw] mt-10 ">
                <div className="font-5xl mb-2">Timer: 00:00</div>
                <SudokuGrid rows={gridSize} cols={gridSize}/>
                {gridSize} x {gridSize}


            </div>
            
        </div>
    );
  }