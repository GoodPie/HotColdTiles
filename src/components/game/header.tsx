import React from "react";

interface GameHeaderProps {
  hasWon: boolean;
  currentClicks: number;
}

const Header: React.FC<GameHeaderProps> = ({ hasWon, currentClicks }) => (
  <>
    {hasWon && <h1 style={{ marginBottom: "0px" }}>You Won!</h1>}
    <h2 style={{ marginTop: "4px" }}>Clicks: {currentClicks}</h2>
  </>
);

export default Header;