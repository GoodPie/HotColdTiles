import { useState, useCallback } from "react";
import Grid from "@components/grid/grid";
import Stats from "@components/stats/stats";
import GameHeader from "@components/game/header";
import GameControls from "@components/game/controls";
import useGameManager from "@hooks/gameManager";

const SIZE = 20;

function App() {
    const [isShowingStats, setIsShowingStats] = useState(false);
    const {
        hasWon,
        key,
        currentClicks,
        target,
        onTileClick,
        resetGame,
        onWinGame
    } = useGameManager(SIZE);

    const toggleStats = useCallback(() => {
        if (!isShowingStats) {
            resetGame();
        }
        setIsShowingStats(prev => !prev);
    }, [isShowingStats, resetGame]);

    return (
      <>
          {!isShowingStats && (
            <GameHeader hasWon={hasWon} currentClicks={currentClicks} />
          )}

          {isShowingStats ? (
            <Stats />
          ) : (
            <Grid
              key={key}
              target={target}
              size={SIZE}
              canInteract={!hasWon}
              onWin={onWinGame}
              onTileClick={onTileClick}
            />
          )}

          <GameControls
            hasWon={hasWon}
            isShowingStats={isShowingStats}
            onReset={resetGame}
            onToggleStats={toggleStats}
          />
      </>
    );
}

export default App;