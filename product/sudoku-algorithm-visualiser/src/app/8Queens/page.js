"use client";
import React, { useState } from "react";
import SudokuGrid from "../../components/sudokugrid";
import QueensNavbar from "../../components/queensNavbar";

export default function Page() {
	const [gridSize] = useState(8);
	const [isFunctionRunning, setIsFunctionRunning] = useState(false);

	function sleep(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	async function longFunction(func) {
		setIsFunctionRunning(true); // Show overlay
		await func(); // Wait for function fo finish
		setIsFunctionRunning(false); // Hide overlay
	}

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
			input.className =
				" text-xl dark:bg-[#1b212c] h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
			input.value = ""; // Clears the values of cells
		});
	}

	async function generateQueens() {
		clearGrid();
		const gridInputs = document.querySelectorAll("#boxcontent");
		// Create an array (of arrays) to hold the values of the chessboard before they are read and added to the main grid
		const board = Array.from({ length: gridSize }, () =>
			Array(gridSize).fill(0)
		);

		async function placeQueens(col) {
			if (col >= gridSize) return true; // All queens placed successfully

			let startRow = Math.floor(Math.random() * gridSize); // Random starting row for the first column

			for (let i = 0; i < gridSize; i++) {
				let row = (startRow + i) % gridSize;
				const cell = Array.from(gridInputs).find(
					(input) =>
						parseInt(input.getAttribute("data-row")) == row &&
						parseInt(input.getAttribute("data-col")) == col
				);

				if (isSafe(board, row, col)) {
					board[row][col] = 1;
					cell.value = 1;
					cell.style.color = "#1b212c";
					cell.style.transition = "background-color 0.3s ease";
					cell.style.backgroundColor = "#ccffcc";

					await sleep(100); // Delay of 100ms
					if (await placeQueens(col + 1)) {
						cell.style.backgroundColor = "";
						cell.style.color = "";

						return true;
					}

					// Backtrack if placing the queen doesn't work
					board[row][col] = 0;
					cell.value = "";
					cell.style.backgroundColor = "#ffcccc";

					await sleep(100); // Delay of 100ms
					cell.style.backgroundColor = "";
				}
			}

			return false; // No valid queen placement found
		}

		longFunction(() => placeQueens(0));
	}

	return (
		<div className="flex font-spacegrotesk">
			<link rel="preconnect" href="https://fonts.googleapis.com"></link>
			<link rel="preconnect" href="https://fonts.gstatic.com"></link>
			<link
				href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Tourney:ital,wght@0,100..900;1,100..900&display=swap"
				rel="stylesheet"
			></link>

			{isFunctionRunning && (
				<div className="absolute w-full h-full opacity-0 z-50 pointer-events-auto" />
			)}

			<QueensNavbar
				generateQueens={generateQueens}
				clearGrid={clearGrid}
			/>
			<div
				id="GridDiv"
				className=" scale-125 flex flex-col fixed justify-center items-center w-[30%] h-full ml-[35vw] mt-10 "
			>
				<div className="font-5xl mb-2">8 Queens Problem</div>
				<SudokuGrid rows={gridSize} cols={gridSize} />
				{gridSize} x {gridSize}
			</div>
		</div>
	);
}
