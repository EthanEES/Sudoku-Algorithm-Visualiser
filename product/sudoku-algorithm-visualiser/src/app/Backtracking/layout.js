import "../globals.css";

export const metadata = {
  title: "Sudoku Algorithm Visualiser",
  description: "Visuliser for different AI based solving algorithms on a sudoku game",
};

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    
      <div className="flex-grow md:overflow-y-auto "> { children } </div>
    </div>
        
  );
}
