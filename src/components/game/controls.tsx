import React from "react";

interface GameControlsProps {
  hasWon: boolean;
  isShowingStats: boolean;
  onReset: () => void;
  onToggleStats: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
                                                     hasWon,
                                                     isShowingStats,
                                                     onReset,
                                                     onToggleStats,
                                                   }) => (
  <>
    {(!isShowingStats && hasWon) && (
      <button style={{marginTop: "1rem"}} onClick={onReset}>
        Reset
      </button>
    )}

    {(isShowingStats || (!isShowingStats && hasWon)) && (
      <button
        style={{marginTop: "1rem", marginLeft: "1rem"}}
        onClick={onToggleStats}
      >
        {isShowingStats ? "Return to Game" : "View Stats"}
      </button>
    )}
  </>
);

export default GameControls;