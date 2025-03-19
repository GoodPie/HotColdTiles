import  { memo, useState, useCallback, useMemo } from "react";
import Tile from "./tile";
import {TileState} from "../../state/tile.state";

interface IGridProps {
    size: number;
    canInteract: boolean;
    onWin: (grid: number[][]) => void;
    target: { x: number; y: number };
    onTileClick: (x: number, y: number) => void;
}

const Grid: React.FC<IGridProps> = memo((props) => {
    const { size, canInteract, onWin, target, onTileClick: propOnTileClick } = props;

    /**
     * Creates a 2D grid of size props.size x props.size
     */
    const createEmptyGrid = useCallback((): number[][] => {
        const grid: number[][] = [];
        for (let y = 0; y < size; y++) {
            grid[y] = [];
            for (let x = 0; x < size; x++) {
                grid[y][x] = TileState.Default;
            }
        }
        return grid;
    }, [size]);

    const [grid, setGrid] = useState<number[][]>(() => createEmptyGrid());

    /**
     * Calculates distance-based tile state
     */
    const getTileState = useCallback(
      (x: number, y: number): number => {
          if (x === target.x && y === target.y) {
              return TileState.Target;
          }

          const distance = Math.sqrt(
            Math.pow(target.x - x, 2) + Math.pow(target.y - y, 2)
          );

          if (distance < Math.floor(size / 6)) {
              return TileState.VeryVeryClose;
          } else if (distance < Math.floor(size / 4)) {
              return TileState.VeryClose;
          } else if (distance < Math.floor(size / 2)) {
              return TileState.Close;
          } else {
              return TileState.Far;
          }
      },
      [target, size]
    );

    /**
     * Handles a grid tile being clicked
     * @param x X coordinate of the tile
     * @param y Y coordinate of the tile
     */
    const handleTileClick = useCallback(
      (x: number, y: number): void => {
          if (!canInteract) return;

          const newGrid = [...grid];
          const newTileState = getTileState(x, y);
          newGrid[y][x] = newTileState;
          setGrid(newGrid);

          propOnTileClick(x, y);

          if (newTileState === TileState.Target) {
              onWin(newGrid);
          }
      },
      [grid, canInteract, getTileState, propOnTileClick, onWin]
    );

    const gridStyles = useMemo(() => ({
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center"
    }), []);

    const rowStyles = useMemo(() => ({
        display: "flex",
        flexDirection: "row" as const
    }), []);

    return (
      <div style={gridStyles}>
          {grid.map((row, y) => (
            <div key={y} style={rowStyles}>
                {row.map((_, x) => (
                  <Tile
                    key={x}
                    y={y}
                    x={x}
                    state={grid[y][x]}
                    onClick={() => handleTileClick(x, y)}
                  />
                ))}
            </div>
          ))}
      </div>
    );
});

export default Grid;