
let casillas = document.getElementsByClassName('casilla');
let btnReset = document.getElementById('btn-reset');
let player1Username = "Player 1";
let player2Username = "Player 2"
let player1 = 1;
let player2 = 2;
let toggleTurn = true;
let turn = 1;
let pos = 0;
let win = false;
let conditionalWinner = [
                          [0, 1, 2],
                          [3, 4, 5], 
                          [6, 7, 8], 
                          [0, 3, 6],
                          [1, 4, 7],
                          [2, 5, 8],
                          [0, 4, 8],
                          [2, 4, 6]
                        ];

let game = Array(9).fill(0);

for (const iterator of casillas) {
    iterator.addEventListener('click', function (element) {
      if (turn >= 9 || win === true)
      {
        setWinnerModal("Nothing");
        toggleModal()
        return;
      }

      pos = parseInt(element.target.dataset.pos);
      
      if (toggleTurn) {
        element.target.innerHTML = 'X';
        element.target.classList.add('player1')
        toggleTurn = !toggleTurn;
        game[pos] = player1;
        toggleTurnDisplay(toggleTurn)
      }
      else {
        element.target.innerHTML = 'O';
        element.target.classList.add('player2')
        toggleTurn = !toggleTurn;
        game[pos] = player2;
        toggleTurnDisplay(toggleTurn)
      }

      turn++;
      
      if (somePlayerWinner(player1))
      {
        win = true;
        setWinnerModal(player1Username);
        toggleModal();
      }
      else if (somePlayerWinner(player2)) {
        win = true
        setWinnerModal(player2Username);
        toggleModal()
      }
    })
}

function toggleTurnDisplay(turn) {
  let turnDisplay = document.getElementById('turn-toggle-display');
  if(turn) {
    turnDisplay.innerHTML = "X";
    turnDisplay.classList.add('player1')
    turnDisplay.classList.remove('player2');
  }
  else {
    turnDisplay.innerHTML = "O";
    turnDisplay.classList.add('player2')
    turnDisplay.classList.remove('player1');
  }
}

function setWinnerModal(winner) {
  document.getElementById('winner').innerHTML = winner
}

btnReset.addEventListener('click', function () {
  turn = 1;
  toggleTurn = true;
  game.fill(0);
  win = false;
  toggleModal();
  toggleTurnDisplay(true);
  clean();
});

function clean() {
  for (const iterator of casillas) {
    iterator.innerHTML = '';
    iterator.classList.remove('player1')
    iterator.classList.remove('player2');
  }
}

function somePlayerWinner(player) {
  let result = false;

  conditionalWinner.forEach((element, index) => {
    if(game[element[0]] === player && game[element[1]] === player && game[element[2]] === player) {
      result = true;
    }
  })

  return result;
}

function toggleModal() {
  let modal = document.getElementById('modal');
  
  if (modal.classList.contains('is-active'))
    document.getElementById('modal').classList.remove('is-active')
  else
    document.getElementById('modal').classList.add('is-active')
}
