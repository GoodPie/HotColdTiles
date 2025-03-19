import {useState, useCallback} from "react";

/**
 * Interface representing game data to be stored
 * @interface GameData
 */
interface GameData {
  /** Target coordinates */
  target: { x: number; y: number };
  /** Number of clicks made in the game */
  clicks: number;
  /** Game grid state */
  grid: number[][];
  /** Timestamp when the game was completed */
  time: number;
}

/**
 * Custom hook that manages the game state and provides game-related functionality
 *
 * @param {number} size - The size of the game grid
 * @returns {Object} Object containing game state and functions
 * @returns {boolean} returns.hasWon - Whether the player has won the game
 * @returns {number} returns.key - Random key used for component re-rendering
 * @returns {number} returns.currentClicks - Number of clicks made in the current game
 * @returns {Object} returns.target - Target coordinates that need to be found
 * @returns {Function} returns.onTileClick - Handler to increment click counter
 * @returns {Function} returns.resetGame - Function to reset the game state
 * @returns {Function} returns.onWinGame - Handler called when the game is won
 */
const useGameManager = (size: number) => {
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [key, setKey] = useState(Math.random());
  const [currentClicks, setCurrentClicks] = useState(0);
  const [target, setTarget] = useState({
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size)
  });

  /**
   * Increments the click counter
   */
  const onTileClick = useCallback(() => {
    setCurrentClicks(prevClicks => prevClicks + 1);
  }, []);

  /**
   * Resets the game to its initial state
   * Generates a new random target position
   */
  const resetGame = useCallback(() => {
    setHasWon(false);
    setKey(Math.random());
    setCurrentClicks(0);
    setTarget({
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size)
    });
  }, [size]);

  /**
   * Handles game completion logic
   * Sets the win state and saves game data to local storage
   *
   * @param {number[][]} grid - The final state of the game grid
   */
  const onWinGame = useCallback((grid: number[][]) => {
    setHasWon(true);

    // Save this game's information to local storage
    const games: GameData[] = JSON.parse(localStorage.getItem("games") ?? "[]");
    games.push({
      target,
      clicks: currentClicks,
      grid,
      time: Date.now()
    });
    localStorage.setItem("games", JSON.stringify(games));
  }, [target, currentClicks]);

  return {
    hasWon,
    key,
    currentClicks,
    target,
    onTileClick,
    resetGame,
    onWinGame
  };
};

export default useGameManager;