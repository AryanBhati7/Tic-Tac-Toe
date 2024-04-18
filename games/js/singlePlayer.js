document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");
  const resetButton = document.getElementById("reset-btn");

  let currPlayer = "X";
  let gameOver = false;

  boxes.forEach((box) => {
    box.addEventListener("click", boxClick);
  });

  resetButton.addEventListener("click", resetGame);

  function boxClick() {
    this.style.color = "darkred";

    if (gameOver || this.textContent !== "") return;
    this.textContent = currPlayer;

    if (checkWin()) {
      gameOver = true;
      swal(`Player ${currPlayer} wins!`);
      return;
    }
    if (checkTie()) {
      gameOver = true;
      swal("Game Tied", {
        buttons: ["Close", "Start a New Game"],
      });
      return;
    }
    currPlayer = currPlayer === "X" ? "O" : "X";
    if (currPlayer === "O") {
      computerMove();
    }
  }

  function checkWin() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        boxes[a].textContent !== "" &&
        boxes[a].textContent === boxes[b].textContent &&
        boxes[a].textContent === boxes[c].textContent
      ) {
        return true;
      }
    }
    return false;
  }
  function checkTie() {
    for (const box of boxes) {
      if (box.textContent === "") {
        return false;
      }
    }
    return true;
  }

  // function computerMove() {
  //   if (gameOver) return;
  //   const emptyBoxes = document.querySelectorAll(".box:empty");
  //   const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  //   randomBox.textContent = currPlayer;
  //   if (checkWin()) {
  //     gameOver = true;
  //     swal(`Player ${currPlayer} wins!`);
  //     return;
  //   }
  //   if (checkTie()) {
  //     gameOver = true;
  //     swal("It's a Tie");
  //     return;
  //   }
  //   currPlayer = "X";
  // }

  //smarter move
  function computerMove() {
    if (gameOver) return;
    const emptyBoxes = Array.from(document.querySelectorAll(".box:empty"));

    // Check if there's a winning move
    for (let box of emptyBoxes) {
      box.textContent = currPlayer;
      if (checkWin()) {
        gameOver = true;
        swal(`Player ${currPlayer} wins!`);
        markWinningBoxes();
        return;
      }
      box.textContent = "";
    }

    // Check if the player is about to win and block it
    for (let box of emptyBoxes) {
      box.textContent = currPlayer === "X" ? "O" : "X";
      if (checkWin()) {
        box.textContent = currPlayer;
        if (checkTie()) {
          gameOver = true;
          swal("It's a Tie");
          return;
        }
        currPlayer = "X";
        return;
      }
      box.textContent = "";
    }

    // If there's no winning or blocking move, take a random box
    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.textContent = currPlayer;
    if (checkWin()) {
      gameOver = true;
      swal(`Player ${currPlayer} wins!`);
      return;
    }
    if (checkTie()) {
      gameOver = true;
      swal("It's a Tie");
      return;
    }
    currPlayer = "X";
  }
  function resetGame() {
    boxes.forEach((box) => {
      box.textContent = "";
    });
    currentPlayer = "X";
    gameOver = false;
  }

  function markWinningBoxes() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        boxes[a].textContent !== "" &&
        boxes[a].textContent === boxes[b].textContent &&
        boxes[a].textContent === boxes[c].textContent
      ) {
        boxes[a].classList.add("winning-box");
        boxes[b].classList.add("winning-box");
        boxes[c].classList.add("winning-box");
        return;
      }
    }
  }
});
