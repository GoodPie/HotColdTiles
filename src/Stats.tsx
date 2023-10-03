import {Bar} from "react-chartjs-2";
import React from "react";
import "chart.js/auto";


const Stats = React.memo(() => {

    /**
     * TODO: This is a work in progress. At the moment, it will just display the data in a graph
     * but we should review the data structures and interactivity with the chart
     */
    const generateGraph = () => {
        const stats = JSON.parse(localStorage.getItem("games") ?? "[]");

        if (stats.length === 0) return <h1>No Stats</h1>


        // Transform data into a format that the graphing library can use
        const data = stats.map((game: any) => {
            return game.clicks
        });

        const dates = stats.map((game: any) => {
            return new Date(game.time).toLocaleDateString() + " " + new Date(game.time).toLocaleTimeString()
        });

        const graphConfiguration = {
            datasetIdKey: "stats",
            datasets: [{
                label: "Clicks",
                data: data,
            }],

            labels: dates,
        }

        return <Bar width={"100%"} options={{maintainAspectRatio: false, indexAxis: "y"}} draggable={true}
                    data={graphConfiguration}/>;

    }

    return (
        <div className="stats"
             style={{ width: "50vw", maxWidth: "50vw", height: "80vh"}}>
            {generateGraph()}
        </div>
    );


});

export default Stats;