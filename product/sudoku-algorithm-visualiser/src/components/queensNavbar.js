"use client";
import React, { useState } from "react";

export default function QueensNavbar({ generateQueens, clearGrid}) {
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const [isSpeedOpen, setIsSpeedOpen] = useState(false);

    return (
        <nav className="flex items-center w-full bg-white dark:bg-[#1b212c] justify-between py-3 px-5 rounded-b-2xl ">
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
                        <button onClick={generateQueens} className=" rounded p-2 mr-2 bg-[#BDD4E7] text-[#1b212c]">Visualise!</button>
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
                                    <button onClick={() => window.location.href = "/"} className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                                            <a>Sudoku</a>
                                    </button>
                                    {[].map((other, index) => (
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
    );
}