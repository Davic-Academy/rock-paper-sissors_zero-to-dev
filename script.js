document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  // -- Screens
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");

  // -- Game Board
  const board = document.getElementsByClassName("board")[0];
  const playerLevel = document.getElementById("player-level");

  // -- Buttons
  const buttons = document.querySelectorAll(".buttons");
  const playButton = document.getElementById("play-button");
  const handsGame = document.querySelectorAll(".hands-game img");
  const restartButton = document.getElementById("restart-button");
  const exitButton = document.getElementById("exit-button");

  // -- Player and Bot
  const playerChoice = document.getElementById("player-hand");
  const botChoice = document.getElementById("bot-hand");
  const playerScore = document.getElementById("player-score");
  const botScore = document.getElementById("bot-score");
  const messageResult = document.getElementsByClassName("message")[0];

  // Scoring variables
  let player = 0;
  let bot = 0;

  // New Game
  function newGame() {
    buttons.forEach((button) => {
      button.style.display = "none";
    });
    board.style.display = "none";
    messageResult.textContent = "";
    handsGame.forEach((hand) => {
      hand.style.display = "flex";
    });
  }

  // Game logic
  function initGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
    playerLevel.textContent = "NEWBIE";
    newGame()
  }

  function getComputerSelection() {
    const options = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * options.length);
    return options[index];
  }

  function determineTheWinner(playerSelection, botSelection) {
    if (playerSelection === botSelection) {
      return "TIE";
    } else if (
      (playerSelection === "rock" && botSelection === "scissors") ||
      (playerSelection === "paper" && botSelection === "rock") ||
      (playerSelection === "scissors" && botSelection === "paper")
    ) {
      player++;
      return "YOU WIN";
    } else {
      bot++;
      return "YOU LOSE";
    }
  }

  function getPlayerLevel(score) {
    if(score >= 20) return "TERMINATOR";
    if(score >= 15) return "MASTER";
    if(score >= 10) return "LEGENDARY";
    if(score >= 5)  return "EXPERT";
    return "NEWBIE";
  }

  // -- Game UI
  function gameUI(playerSelection) {
    const botSelection = getComputerSelection();

    playerChoice.src = `./assets/hands/${playerSelection}.png`;
    botChoice.src = `./assets/hands/${botSelection}.png`;

    const result = determineTheWinner(playerSelection, botSelection);
    messageResult.textContent = result;

    playerScore.textContent = player;
    botScore.textContent = bot;

    playerLevel.textContent = getPlayerLevel(player);
  }

  // Initialize the game when the play button is clicked
  playButton.addEventListener("click", initGame);

  // Event listeners for buttons
  handsGame.forEach((hand) => {
    hand.addEventListener("click", (e) => {
      const playerSelection = e.target.id;
      gameUI(playerSelection);
      board.style.display = "flex";
      buttons.forEach((button) => {
        button.style.display = "flex";
      });
      handsGame.forEach((hand) => {
        hand.style.display = "none";
      });
    });
  });

  restartButton.addEventListener("click", () => {
    newGame();
  });

  exitButton.addEventListener("click", () => {
    startScreen.style.display = "flex";
    gameScreen.style.display = "none";
    playerLevel.textContent = "NEWBIE";
    player = 0;
    bot = 0;
    playerScore.textContent = player;
    botScore.textContent = bot;
  });
});
