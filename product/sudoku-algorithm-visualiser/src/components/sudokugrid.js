// components/Grid.js
import React from 'react';

const Grid = () => {
    const rows = 9;
    const cols = 9;
    
    const gridItems = [];
    let index = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const isThickBorderRow = (i + 1) % 3 == 0; // Thick border after every 3rd row
            const isThickBorderCol = (j + 1) % 3 == 0; // Thick border after every 3rd column

            // Determine className for the grid item
            let className = "grid-item border flex items-center justify-center border-gray-600 ";

            // Add bottom border if it's a thick border row
            if (isThickBorderRow && i != 8) {
                className += "border-b-4 border-b-white "; // Bottom border for 3rd and 6th row
            }

            // Add right border if it's a thick border column
            if (isThickBorderCol && j != 8) {
                className += "border-r-4 border-r-white "; // Right border for 3rd and 6th column
            }

            // Push the grid item
            gridItems.push(
                <div className={className} key={`${index}`}>
                    <input id="boxcontent" type="number" min="1" max="9" required className=" text-xl bg-transparent h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>

                </div>
            );
            index++;
        }
    }

    return (
        <div className="grid grid-rows-9 grid-cols-9 dark:bg-[#1b212c] border-solid rounded border-4 h-[30%] w-[30%] mx-auto">
            {gridItems}
        </div>
    );
};

export default Grid;
