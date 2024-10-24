export default function Page() {
    return (
        <div>
            

            <header className="flex items-center w-full bg-white dark:bg-[#0F1217] justify-between py-5 px-5">
                <a className="break-words">
                    <div className="flex items-center justify-between">
                        <div className="max-w-16 ">
                            <img className="" src="/Su.png" alt="image description"></img>
                        </div>
                        <div className="h-6 text-xl font-semibold sm:block">Sudoku Algorithm Visualiser</div>
                    </div>
                </a>
                <div className="flex items-center space-x-4 leading-5 sm:space-x-6">---------------------------------- Game Options Here ----------------------------------</div>
            </header>
        </div>
    );
  }