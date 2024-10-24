// components/Grid.js
import React from 'react';

const Grid = () => {
    const rows = 9;
    const cols = 9;
    
    const gridItems = [];
    let index = 0;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            ;
            gridItems.push(
                <div className="grid-item border flex items-center justify-center border-gray-400" key={`${index}`}>
                    {index}
                </div>
            );
            index++;

        }
    }

    console.log(gridItems);

    return (
        <div className="grid grid-rows-9 grid-cols-9 border-solid border-2 h-[30%] w-[30%] ">
            {gridItems}
            
        </div>
    );
};

export default Grid;
