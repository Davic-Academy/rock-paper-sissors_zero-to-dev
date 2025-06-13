document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const playButton = document.getElementById("play-button");

  function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
  }

  if (playButton) {
    playButton.addEventListener("click", startGame);
  }
});
