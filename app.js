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
      popUP(currPlayer);
      return;
    }
    if (checkTie()) {
      gameOver = true;
      popUP(currPlayer, true);
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
      box.style.color = currPlayer === "X" ? "darkred" : "black";
      if (checkWin()) {
        gameOver = true;
        markWinningBoxes(), 1000;
        popUP(currPlayer);
        return;
      }

      box.textContent = "";
    }

    // Check if the player is about to win and block it
    for (let box of emptyBoxes) {
      box.textContent = currPlayer === "X" ? "O" : "X";
      box.style.color = currPlayer === "X" ? "darkred" : "black";
      if (checkWin()) {
        box.textContent = currPlayer;
        if (checkTie()) {
          gameOver = true;
          popUP(currPlayer, true);
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
    randomBox.style.color = currPlayer === "X" ? "darkred" : "black";
    if (checkWin()) {
      gameOver = true;
      popUP(currPlayer);
      // swal(`Player ${currPlayer} wins!`);
      markWinningBoxes();
      return;
    }
    if (checkTie()) {
      gameOver = true;
      popUP(currPlayer, true);
      return;
    }
    currPlayer = "X";
  }
  function resetGame() {
    boxes.forEach((box) => {
      box.textContent = "";
      box.classList.remove("winning-box");
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
  function popUP(Player, isTie) {
    let message, icon;
    if (isTie == true) {
      message = "It's a Tie";
      icon = "img/tie.gif";
    } else {
      if (Player === "X") {
        message = "Player - X i.e You Won";
        icon = "img/win.gif";
      } else {
        message = "Player - O i.e Computer Won";
        icon = "img/lose.gif";
      }
    }

    setTimeout(() => {
      swal(message, {
        icon: icon,
        buttons: {
          NewGame: "Start New Game",
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then((value) => {
        switch (value) {
          case "Home":
            window.location.href = "http://www.google.com";
            break;

          case "NewGame":
            resetGame();
            break;
        }
      });
    }, 300);
  }
});
