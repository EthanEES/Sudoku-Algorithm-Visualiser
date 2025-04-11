
#  Final Year Project Diary 📚

This is the diary linked to my final year project referenceing what i have done on a day to day basis in terms of what research i have done, the files i have updated or added, and any general additions or thoughts I may have about the project im working on.

##  Week 22 - 05/04/25 - 11/04/25
This final week i spent time tidying up my code for submission ensureing the code was well foratted and readable whilst also merging any left over feature branches to ensure the project was put together properly.

##  Week 21 - 24/03/25 - 30/03/25
This week I spent time explaining the algorithms to the user on each page.

I also came across a bug in which the user would be able to interact with the site while the program is running so i implemented a function to stop this so nothing can interfere with the algorithms computation.

##  Week 20 - 17/03/25 - 23/03/25
I continued my work on the new algorithm and implemented buttons and functions for the user to step through and run the the solution process of the puzzle.

Also fixed the issue with speed changeing in the navbar by creating a react state to hold and manage the state of speed which i implemented into this algorithms visualisation as well as the old backtracking one.

##  Week 19 - 10/03/25 - 16/03/25
This week I added a few CSS chanegs to ensure the page was responsive and reactive when changing screen size aswell as more paths to the navbar.

I also spent time creating areas on the page that would explain the process of the algorithms to the users in a simple and user friendly way.

Additionally created a page for the next algorithm, forward checking. 

##  Week 18 - 03/03/25 - 09/03/25
This was one of the most important weeks so far, focusing hevaliy on user experience. This week i made multiple changes to the website adding buttons and changing css to aid the user with navagation.

This followed into me then refactoring the navigation bar entirely into a React component so that i could easily change the bar whenever i need and reduce the repeated code.

I also made some changes to the animation to the visualisation so its smoother through animation and more vibrant colours.

##  Week 17 - 24/02/25 - 02/03/25

The major milestone completed this week included the creation of the backtracking algorithm and applying it to the game to solve the puzzle. This took up most of the week and included the addition of multiple functions and state changes to check if previous values entered were wrong and recursivly solve the problem.

Additionally I changed the checkGrid function to provide an animation when the user loses the game or when the grid is completly correct.

- Highlighting was added for backtracking cell values.

##  Week 16 - 17/02/25 - 23/02/25

Focused on refining the Sudoku game, improving user experience, and adding game mechanics to enhance functionality.

Refactored my way of removing some of the sudoku grid values so the values are saved and accessable later on in the code where needed.

Created a button to compare the Unknown removed values with the attempt to see if the user is correct and assigned the user 3 lives for each time an attempt is wrong.

Improved the user experience by preventing the user from changing some of the set values within the grid by making them READONLY and other small bugs.

Created a display to show the users their lives after each grid Check.

##  Week 15 - 10/02/25 - 16/02/25

Created functions to access the grid and generate a valid, rule abiding, randomly generated sudoku puzzle.

- I then added conditions to the generation so that it removed values from the grid so it becomes actually solvable.

Optimised the performace by creating specific variables to hold the grid and subgrid sizes rather than computing everytime.
 
 Refactored the grid generation using the new variables created for the grid sizes. 
 
 Removed some unnessisay code and grid options.

##  Week 10 - 02/12/24 - 09/12/24

- Creation of 8 Queens Grid and Page

- Implementation of Backtracking to 8 Queens Problem

##  Week 9 - 17/11/24 - 24/11/24

- Button Creation and Grid Functionality

Today I spent time creating some baseplate buttons for the grid functionality so that the user can change the size, generate a random grid, and clear the grid.

- Full Button Functionality

This day I spent my time adding proper functionality to the buttons so that they actually work and control the grid elements. This research and practice with JavaScript will come in handy later when programming the algorithms. Additionally, I refactored the original grid component so that it takes in two parameters when called upon, allowing the grid size to be changed. This is linked to the size button, which is programmed to alter this variable of the grid when needed.

##  Week 8 - 10/11/24 - 17/11/24

- Bug Fixes and Font Addition

I made some bug fixes in the code, adding the correct Google Fonts link to the font I wanted to use and applying it to the text across the page.

##  Week 7 - 3/11/24 - 10/11/24

- Sudoku Grid Creation and Error Prevention

Today I continued working on the website and managed to add some React and JavaScript to create a Sudoku grid on the page. It resembles the actual Sudoku game, showing the 3x3 boxes within the overall 9x9 grid. This is all created in a loop that generates a \texttt{div} per box and adds it to an array, allowing me to refer to each box individually and make any overall changes or checks. The grid has also been made editable with \textbf{ONLY} numbers to prevent the user from placing letters in the base game.

##  Week 5/6 - 21/10/24 - 3/11/24

- Next.js and React Webpage

Today I created the initial webpage for my project using the chosen framework, Next.js, alongside React. I installed and set up the required libraries and Node.js framework on my computer and used \texttt{npm create-next-app} to create a webpage to use. I tidied up the folder and template site, then set up the website to be deployed on a platform called Vercel. The deployment worked, and the site was ready to be expanded.

- Refactoring Page and Navbar Creation

On this day, I refactored the template boilerplate from Next.js and added a navbar base to the website. This will hold all the options for the game, allowing users to select between different game modes and algorithm types. I also used Photoshop to create a logo for my website as well as a favicon to go with it.

##  Week 2 - 30/09/24 - 06/10/24

- GitLab Setup and Research

This is the first day I began the project by starting this diary. I spent time researching \textquotedblleft Markdown Documentation\textquotedblright\ and its features. I also cloned and set up my GitLab repository, making it ready to start coding once I had completed enough research and finalized my plan.

> Quote Markdown Example

>

>  - Bullet Point Markdown Example

>

>  -  **Bold Markdown Example**

>

>  -  [Hyperlink Markdown Example](https://google.com)

>

>  1. Number Markdown Example