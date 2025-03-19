import React from "react";
import { TileState } from "../../state/tile.state";
import "./tile.css";

interface IGridTileProps {
    x: number;
    y: number;
    state: number;
    onClick: (x: number, y: number) => void;
}

const Tile: React.FC<IGridTileProps> = ({ x, y, state, onClick }) => {
    const getTileClassName = () => {
        switch (state) {
            case TileState.Default:
                return "tile tile-default";
            case TileState.Far:
                return "tile tile-far";
            case TileState.Close:
                return "tile tile-close";
            case TileState.VeryClose:
                return "tile tile-vclose";
            case TileState.VeryVeryClose:
                return "tile tile-vvclose";
            case TileState.Target:
                return "tile tile-target";
            default:
                return "tile tile-default";
        }
    };

    return (
      <div
        className={getTileClassName()}
        onClick={() => onClick(x, y)}
      />
    );
};

export default Tile;