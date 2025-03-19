import { Bar } from "react-chartjs-2";
import { memo } from "react";
import "chart.js/auto";

// Define proper types for game stats
interface GameStats {
  clicks: number;
  time: number;  // timestamp
}

const Stats = memo(() => {
  /**
   * Generates a bar chart based on stored game statistics
   */
  const generateGraph = () => {
    const stats: GameStats[] = JSON.parse(localStorage.getItem("games") ?? "[]");

    if (stats.length === 0) {
      return <h1>No Stats</h1>;
    }

    // Transform data into a format for the chart
    const data = stats.map((game) => game.clicks);

    const dates = stats.map((game) => {
      const date = new Date(game.time);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    });

    const graphConfiguration = {
      datasetIdKey: "stats",
      datasets: [
        {
          label: "Clicks",
          data: data,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        }
      ],
      labels: dates,
    };

    return (
      <Bar
        width="100%"
        options={{
          maintainAspectRatio: false,
          indexAxis: "y",
          plugins: {
            title: {
              display: true,
              text: "Game History"
            }
          }
        }}
        data={graphConfiguration}
      />
    );
  };

  return (
    <div
      className="stats"
      style={{
        width: "50vw",
        maxWidth: "50vw",
        height: "80vh",
        padding: "1rem"
      }}
    >
      {generateGraph()}
    </div>
  );
});

export default Stats;