import './App.css'
import Grid from "./Grid.tsx";
import {useState} from "react";
import Stats from "./Stats";

const SIZE = 20;

function App() {

    // Game States
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [key, setKey] = useState(Math.random())
    const [currentClicks, setCurrentClicks] = useState(0);
    const [target, setTarget] = useState({
        x: Math.floor(Math.random() * SIZE),
        y: Math.floor(Math.random() * SIZE)
    });

    const [isShowingStats, setIsShowingStats] = useState(false);

    /**
     * Handles incrementing the score when a tile is clicked
     */
    const onTileClick = () => {
        const clicks = currentClicks + 1;
        setCurrentClicks(clicks);

    }

    /**
     * Handles resetting the state of the game
     * Reset the key to re-generate the grid
     */
    const resetGame = () => {
        setHasWon(false);
        setKey(Math.random());
        setCurrentClicks(0);
        setTarget({
            x: Math.floor(Math.random() * SIZE),
            y: Math.floor(Math.random() * SIZE)
        });
    }

    /**
     * Show the current stats
     * This will trigger a reset as the button should only be visible when the game is over
     */
    const showStats = () => {
        resetGame();
        const statsDisplay = !isShowingStats;
        setIsShowingStats(statsDisplay);
    }


    /**
     * Handles winning the game and saving the stats to storage
     * @param grid
     */
    const onWinGame = (grid: number[][]) => {
        setHasWon(true);

        // Let's save this games information to local storage
        const games = localStorage.getItem("games") ?? "[]";

        const gamesArray = JSON.parse(games);
        gamesArray.push({
            target: target,
            clicks: currentClicks,
            grid: grid,
            time: new Date().toISOString()
        });
        localStorage.setItem("games", JSON.stringify(gamesArray));

    }


    return (
        <>
            {!isShowingStats && (<>
                    {hasWon && <h1 style={{marginBottom: "0px"}}>You Won!</h1>}
                    <h2 style={{marginTop: "4px"}}>Clicks: {currentClicks}</h2>
                </>
            )
            }

            {
                isShowingStats ? <Stats></Stats> :
                    <Grid key={key} target={target} size={SIZE} canInteract={!hasWon} onWin={(grid) => onWinGame(grid)}
                          onTileClick={onTileClick}/>
            }

            {
                (!isShowingStats && hasWon) &&
                <button style={{marginTop: "1rem"}} onClick={() => resetGame()}>Reset</button>
            }

            {
                (isShowingStats || (!isShowingStats && hasWon)) &&
                <button style={{marginTop: "1rem", marginLeft: "1rem"}}
                        onClick={() => showStats()}>{isShowingStats ? "Return to Game" : "View Stats"}</button>
            }

        </>
    )
}

export default App
