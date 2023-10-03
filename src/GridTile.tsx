import {TileStates} from "./TileStates.ts";

interface IGridTileProps {
    x: number;
    y: number;
    state: number;
    onClick: (x: number, y: number) => void
}

const GridTile = (props: IGridTileProps) => {

    /**
     * Returns the color of the tile based on the state
     */
    const getTileColor = () => {

        switch (props.state) {
            case TileStates.Default:
                return "white";
            case TileStates.Far:
                return "red";
            case TileStates.Close:
                return "orange";
            case TileStates.VeryClose:
                return "yellow";
            case TileStates.VeryVeryClose:
                return "chartreuse";

            case TileStates.Target:
                return "green";
            default:
                return "white";
        }
    }

    return (
        <div onClick={() => props.onClick(props.x, props.y)}
             style={{height: "25px", width: "25px", background: getTileColor(), margin: 5, cursor: "pointer"}}>
        </div>
    )


}

export default GridTile;