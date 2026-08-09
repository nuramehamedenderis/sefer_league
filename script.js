// =====================================
// SEFER LEAGUE V1 - GAME SCRIPT
// =====================================

const player = document.querySelector(".player");
const ball = document.querySelector(".ball");
const scoreElement = document.querySelector(".score");
const timerElement = document.querySelector(".timer");

// Game state
let playerX = 50;
let playerY = 50;

let ballX = 50;
let ballY = 50;

let blueScore = 0;
let redScore = 0;

let seconds = 90;
let gameRunning = true;

const speed = 1.5;
const kickPower = 8;

// -------------------------------------
// Player movement
// -------------------------------------

function movePlayer(dx, dy) {
  if (!gameRunning || !player) return;

  playerX += dx;
  playerY += dy;

  // Keep player inside field
  playerX = Math.max(4, Math.min(96, playerX));
  playerY = Math.max(5, Math.min(95, playerY));

  updatePlayer();
  checkBallDistance();
}

function updatePlayer() {
  if (!player) return;

  player.style.left = playerX + "%";
  player.style.top = playerY + "%";
}

// -------------------------------------
// Ball
// -------------------------------------

function updateBall() {
  if (!ball) return;

  ball.style.left = ballX + "%";
  ball.style.top = ballY + "%";
}

function checkBallDistance() {
  const distance = Math.sqrt(
    Math.pow(playerX - ballX, 2) +
    Math.pow(playerY - ballY, 2)
  );

  if (distance < 8) {
    ballX += (ballX - playerX) * 0.08;
    ballY += (ballY - playerY) * 0.08;

    ballX = Math.max(3, Math.min(97, ballX));
    ballY = Math.max(4, Math.min(96, ballY));

    updateBall();
  }
}

// -------------------------------------
// Kick
// -------------------------------------

function kickBall() {
  if (!gameRunning) return;

  const dx = ballX - playerX;
  const dy = ballY - playerY;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 12) {
    if (distance === 0) {
      ballX += kickPower;
    } else {
      ballX += (dx / distance) * kickPower;
      ballY += (dy / distance) * kickPower;
    }

    ballX = Math.max(2, Math.min(98, ballX));
    ballY = Math.max(3, Math.min(97, ballY));

    updateBall();

    checkGoal();
  }
}

// -------------------------------------
// Goal detection
// -------------------------------------

function checkGoal() {
  // Left goal
  if (ballX <= 3 && ballY > 38 && ballY < 62) {
    redScore++;
    updateScore();
    resetBall();
  }

  // Right goal
  if (ballX >= 97 && ballY > 38 && ballY < 62) {
    blueScore++;
    updateScore();
    resetBall();
  }
}

function updateScore() {
  if (!scoreElement) return;

  scoreElement.textContent =
    blueScore + " - " + redScore;
}

function resetBall() {
  ballX = 50;
  ballY = 50;

  updateBall();
}

// -------------------------------------
// Keyboard controls
// -------------------------------------

document.addEventListener("keydown", function(event) {

  if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
    movePlayer(0, -speed);
  }

  if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
    movePlayer(0, speed);
  }

  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    movePlayer(-speed, 0);
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    movePlayer(speed, 0);
  }

  if (event.code === "Space") {
    event.preventDefault();
    kickBall();
  }
});

// -------------------------------------
// Mobile buttons
// -------------------------------------

function setupButton(id, dx, dy) {
  const button = document.getElementById(id);

  if (!button) return;

  button.addEventListener("touchstart", function(event) {
    event.preventDefault();
    movePlayer(dx, dy);
  });

  button.addEventListener("click", function() {
    movePlayer(dx, dy);
  });
}

setupButton("up", 0, -speed);
setupButton("down", 0, speed);
setupButton("left", -speed, 0);
setupButton("right", speed, 0);

// Kick button
const kickButton = document.getElementById("kick");

if (kickButton) {
  kickButton.addEventListener("click", kickBall);

  kickButton.addEventListener("touchstart", function(event) {
    event.preventDefault();
    kickBall();
  });
}

// -------------------------------------
// Match timer
// -------------------------------------

function updateTimer() {
  if (!timerElement) return;

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  timerElement.textContent =
    minutes + ":" + String(secs).padStart(2, "0");

  if (seconds <= 0) {
    gameRunning = false;
    timerElement.textContent = "FULL TIME";

    alert(
      "Full Time!\n\n" +
      "Sefer League\n" +
      blueScore + " - " + redScore
    );

    return;
  }

  seconds--;
}

setInterval(updateTimer, 1000);

// -------------------------------------
// Start game
// -------------------------------------

updatePlayer();
updateBall();
updateScore();
updateTimer();

console.log("Sefer League V1 started!");