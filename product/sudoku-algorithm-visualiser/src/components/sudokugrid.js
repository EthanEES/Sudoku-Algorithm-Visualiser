// components/Grid.js
import React from 'react';

const Grid = ({ rows = 9, cols = 9 }) => {
    const gridItems = [];
    const gridSize = rows
    const subgridSize = Math.sqrt(rows)
    let index = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const isThickBorderRow = (i + 1) % (subgridSize) == 0; // Thick border 
            const isThickBorderCol = (j + 1) % (subgridSize) == 0; // Thick border 

            // Determine className for the grid item
            let className = "grid-item border flex items-center justify-center border-gray-600 ";

            // Add bottom border if it's a thick border row
            if (isThickBorderRow && i != (gridSize - 1)) {
                className += "border-b-4 border-b-white "; // Bottom border for 3rd and 6th row
            }

            // Add right border if it's a thick border column
            if (isThickBorderCol && j != (gridSize - 1)) {
                className += "border-r-4 border-r-white "; // Right border for 3rd and 6th column
            }

            // Push the grid item
            gridItems.push(
                <div className={className} key={`${index}`}>
                    <input id="boxcontent" type="number" min="1" max="9" data-index={index} data-row={i} data-col={j} required className=" text-xl dark:bg-[#1b212c] h-[80%] w-[80%] place-items-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>

                </div>
            );
            index++;
        }
    }

    return (
        <div>

            <div className="grid dark:bg-[#1b212c] border-solid rounded border-4 mx-auto"
            style={{
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                maxWidth: '90vw', // Ensures grid doesn't overflow horizontally
                maxHeight: '90vh', // Ensures grid doesn't overflow vertically
                minWidth: '300px', // Minimum grid width
                minHeight: '300px', // Minimum grid height
                
            }}
    >
            
                {gridItems}
            
            </div>
        </div>


    );
};

export default Grid;
