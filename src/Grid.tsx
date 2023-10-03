import React, {useState} from "react";
import {TileStates} from "./TileStates.ts";
import GridTile from "./GridTile.tsx";

interface IGridProps {
    size: number;
    canInteract: boolean;
    onWin: (grid: number[][]) => void;
    target: { x: number, y: number };
    onTileClick: (x: number, y: number) => void;
}

const Grid = React.memo((props: IGridProps) => {

    /**
     * Creates a 2D grid of size props.size x props.size
     */
    const createEmptyGrid = (): number[][] => {

        const grid: number[][] = [];
        for (let y = 0; y < props.size; y++) {
            grid[y] = [];
            for (let x = 0; x < props.size; x++) {
                grid[y][x] = TileStates.Default;
            }
        }

        return grid;
    }

    /**
     * Handles a grid tile being clicked
     * We'll manage the tiles here and pass the state down to the tile
     * @param x X co-ord of the tile
     * @param y Y co-ord of the tile
     */
    const onTileClick = (x: number, y: number) => {

        // Not able to proceed
        if (!props.canInteract) {
            return;
        }

        const newGrid = [...grid];

        if (x === props.target.x && y === props.target.y) {
            newGrid[y][x] = TileStates.Target;
            props.onWin(grid);
        } else {

            // Determine if we are within range of the target
            const distance = Math.sqrt(Math.pow(props.target.x - x, 2) + Math.pow(props.target.y - y, 2));
            if (distance < Math.floor(props.size / 6)) {
                newGrid[y][x] = TileStates.VeryVeryClose;
            } else if (distance < Math.floor(props.size / 4)) {
                newGrid[y][x] = TileStates.VeryClose;
            } else if (distance < Math.floor(props.size / 2)) {
                newGrid[y][x] = TileStates.Close;
            } else {
                newGrid[y][x] = TileStates.Far;
            }
        }

        setGrid(newGrid);
        props.onTileClick(x, y);
    }

    const [grid, setGrid] = useState<number[][]>(createEmptyGrid());

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {grid.map((row, y) => {
                    return (
                        <div key={y} style={{display: "flex", flexDirection: "row"}}>
                            {row.map((_, x) => {
                                return (
                                    <GridTile y={y} x={x} state={grid[y][x]} key={x}
                                              onClick={() => onTileClick(x, y)}></GridTile>
                                )
                            })}
                        </div>
                    )
                }
            )}
        </div>
    )


});

export default Grid;