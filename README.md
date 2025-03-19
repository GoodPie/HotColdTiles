# Hot or Cold: Tile Guessing Game

[![Play Game](https://img.shields.io/badge/Play%20Game-Online-brightgreen)](https://hot-cold-tiles.vercel.app/)

A fun and challenging game where players must find a hidden target on a 20x20 grid. The tiles change color based on your proximity to the target - red (far away), yellow (getting closer), chartreuse (very close), or green (found it!). Track your progress and view your stats after each game.

This is just a simple little project where I can have fun experimenting with different things with an existing project.

## Features

- 20x20 interactive game grid
- Colour-based proximity feedback
- Game statistics tracking
- Responsive design
- History visualisation with Chart.js

## Getting Started

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/goodpie/HotColdTiles.git
   cd HotColdTiles
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Start the development server
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. Click any tile on the grid to start
2. The tile will change color based on how close you are to the target:
   - **Red**: Far away from the target
   - **Yellow**: Getting closer
   - **Chartreuse**: Very close
   - **Green**: You found the target!
3. Continue clicking tiles until you find the target
4. After completing a game, you can:
   - Start a new game
   - View your stats to see your performance history

## Stats Tracking

The game keeps track of:
- Number of clicks per game
- Timestamp of completed games
- Grid state at completion

Your stats are visualised in a bar chart showing your progression over time.

## Built With

- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Chart.js](https://www.chartjs.org/) - Statistics visualization
- [Vite](https://vitejs.dev/) - Build tool and development server