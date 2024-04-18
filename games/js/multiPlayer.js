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
    if (gameOver || this.textContent !== "") return;
    this.textContent = currPlayer;
    this.style.color = currPlayer === "X" ? "darkred" : "black";

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

  function resetGame() {
    boxes.forEach((box) => {
      box.textContent = "";
      box.style.color = "black";
    });
    currPlayer = "X";
    gameOver = false;
  }
});
