"use client";
import React, { useState } from "react";

export default function HomeNavbar({ generateGrid, sizeGrid, checkGrid, gridSolution, clearGrid, longFunction}) {
    const [isAlgorithmsOpen, setIsAlgorithmsOpen] = useState(false);
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const [isSpeedOpen, setIsSpeedOpen] = useState(false);
    const [speedType, setSpeedType] = useState("Fast");

    return (
        <nav className="flex items-center w-full fixed bg-[#1b212c] justify-between py-3 px-5 rounded-b-2xl ">
                <a className="break-words">
                    <div className="flex items-center justify-between">
                        <button onClick={() => window.location.href = "/"} className="max-w-16 rounded py-2 mr-2 hover:bg-[#313c50]">
                            <img className="" src="/Su.png" alt="image description"></img>
                        </button>
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
                                <ul className="absolute mt-2 bg-gray-800 border rounded">
                                    {[["Backtracking (BT)", "Backtracking"], ["Constraint-Propagation (BT)", "Constraint-Propagation"]].map(([algo, html], index) => (
                                        <button key={index} onClick={() => window.location.href = "/"+ html} className="w-full px-4 py-2 hover:bg-gray-200 hover:bg-gray-700 text-nowrap">
                                            <a>{algo}</a>
                                        </button>
                                    ))}
                                </ul>
                            )}

                        </div>
                        <button onClick={() => longFunction(generateGrid)} className=" rounded p-2 mr-2 hover:bg-[#313c50]">GenerateGrid</button>
                        <button onClick={sizeGrid} className=" rounded p-2 mr-2 hover:bg-[#313c50]">SizeGrid</button>
                        <button onClick={() => checkGrid(gridSolution)} className=" rounded p-2 mr-2 bg-[#BDD4E7] text-[#1b212c]">Check Grid!</button>
                        
                        <button onClick={clearGrid} className=" rounded p-2 mr-2 hover:bg-[#313c50]">Clear Grid</button>
                        <div id="OtherDropdown" className="relative rounded p-2 mr-3 hover:bg-[#313c50]">
                            <button onClick={() => setIsOtherOpen(!isOtherOpen)} className="" aria-expanded={isOtherOpen}>
                                Other ▼
                            </button>
                            {isOtherOpen && (
                                <ul className="absolute mt-2 bg-gray-800 border rounded">
                                    {["8Queens"].map((other, index) => (
                                        <button key={index} onClick={() => window.location.href = "/"+ other} className="w-full px-4 py-2 hover:bg-gray-200 hover:bg-gray-700">
                                            <a>{other}</a>
                                        </button>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    </div>
            </nav>
    );
}