const words = ["JAVA", "PIZZA", "MATRIX", "CHORIZO", "CABEZOTA"];
let currentWord;
let guessedLetters;
let wrongGuesses;
let hangmanStage;
let initialHangmanAscii;

function showStartModal() {
  const startModal = document.getElementById('startModal');
  startModal.style.display = 'block';
}

let playerName="";

function startGame() {
  const playerNameInput = document.getElementById('playerName');
  startModal.style.display = 'none';

  /*Almacenamiento de nombres */
  playerName = playerNameInput.value.trim();
  let players=localStorage.getItem("hangmanPlayers");
  if(!players){
    players=[]; // empty
  }else{
    players=JSON.parse(players); // si hay jugadores,convierte JSON a array
  }

  if (!players.includes(playerName)) {
    players.push(playerName);
    localStorage.setItem("hangmanPlayers", JSON.stringify(players));
  }

  // Muestro el resto del contenido del juego
  const gameContent = document.getElementById('gameContent');
  gameContent.classList.remove('hidden');

  currentWord = words[0];
  guessedLetters = Array(currentWord.length).fill('_');
  wrongGuesses = 0;
  hangmanStage = 0;
  updateWordDisplay();
  updateHangmanAscii();
  updateScore();
}

function updateScore() {
  const userScoreDiv = document.getElementById("userScore");
  let players = localStorage.getItem("hangmanPlayers");
  if (players) {
    players = JSON.parse(players); // Convertir la cadena JSON de jugadores a un array.

    // Filtro el jugador actual de la lista de jugadores previos
    const previousPlayers = players.filter(player => player !== playerName);

    let previousPlayersString = previousPlayers.join(", "); // Unir los nombres con una coma

    // Agregar un punto al final de la cadena
    previousPlayersString += ".";

    if (previousPlayersString !== ".") { // Verifico si hay jugadores previos para mostrar el mensaje
      userScoreDiv.innerHTML = `
        <p class="current-player">Current Player: ${playerName}</p>
        <p class="previous-players">Previous Players: ${previousPlayersString}</p>
      `;
    } else {
      userScoreDiv.innerHTML = `
        <p class="current-player">Current Player: ${playerName}</p>
        <p class="no-previous-players">No previous players yet.</p>
      `;
    }
  } else {
    userScoreDiv.innerHTML = `
      <p class="current-player">Current Player: ${playerName}</p>
      <p class="no-previous-players">No previous players yet.</p>
    `;
  }
}


function guessLetter(letter) {
  if (guessedLetters.includes(letter) || !currentWord.includes(letter)) {
    wrongGuesses++;
    hangmanStage++;
    updateHangmanAscii();
    if (wrongGuesses >= 6) {
      showLoseModal();
    }
  } else {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === letter) {
        guessedLetters[i] = letter;
      }
    }
    updateWordDisplay();
    if (!guessedLetters.includes('_')) {
      showWinModal();
    }
  }
  const letterButton = event.target;
  letterButton.disabled = true;
}

function updateWordDisplay() {
  const wordDisplay = document.getElementById('wordDisplay');
  wordDisplay.textContent = guessedLetters.join(' ');
}

function updateHangmanAscii() {
  const hangmanImg = document.getElementById('hangmanImg');
  switch (hangmanStage) {
    case 1:
      hangmanImg.src = 'assets/hangman png/1.png';
      break;
    case 2:
      hangmanImg.src = 'assets/hangman png/2.png';
      break;
    case 3:
      hangmanImg.src = 'assets/hangman png/3.png';
      break;
    case 4:
      hangmanImg.src = 'assets/hangman png/4.png';
      break;
    case 5:
      hangmanImg.src = 'assets/hangman png/5.png';
      break;
    case 6:
      hangmanImg.src = 'assets/hangman png/6.png';
      break;
    default:
      hangmanImg.src = 'assets/hangman png/0.png';
  }
}

function showLoseModal() {
  const loseModal = document.getElementById('loseModal');
  loseModal.style.display = 'block';
}

function showWinModal() {
  const winModal = document.getElementById('winModal');
  winModal.style.display = 'block';
}

function resetGame() {
  const loseModal = document.getElementById('loseModal');
  loseModal.style.display = 'none';
  const hangmanImg = document.getElementById('hangmanImg');
  hangmanImg.src = 'assets/hangman png/0.png';

    // Habilitar los botones de clase "btns"
    const letterButtons = document.querySelectorAll('.btns');
    letterButtons.forEach(button => {
      button.disabled = false;
    });

  startGame();
}

function nextWord() {
  const winModal = document.getElementById('winModal');
  winModal.style.display = 'none';
  const hangmanImg = document.getElementById('hangmanImg');
  const currentWordIndex = words.indexOf(currentWord);
  if (currentWordIndex + 1 < words.length) {
    currentWord = words[currentWordIndex + 1];
    guessedLetters = Array(currentWord.length).fill('_');
    wrongGuesses = 0;
    hangmanStage = 0;
    updateWordDisplay();
    updateHangmanAscii();
    hangmanImg.src = 'assets/hangman png/0.png'; 

        // Habilitar los botones de clase "btns"
        const letterButtons = document.querySelectorAll('.btns');
        letterButtons.forEach(button => {
          button.disabled = false;
        });
        
      } else {
        const gameContent = document.getElementById('gameContent');
        const congratsScreen = document.getElementById('congratsScreen');
    
        gameContent.style.display = 'none';
        congratsScreen.classList.add('congrats-screen-show');
        congratsScreen.style.visibility = 'visible';
      }
}

function playAgain() {
  location.reload();
}

window.onload = function() {
  const playerNameInput = document.getElementById('playerName');
  const startButton = document.getElementById('startButton');

  playerNameInput.addEventListener('input', function () {
    if (playerNameInput.value.length >= 3) {
      startButton.disabled = false;
      startButton.style.cursor = 'pointer';
    } else {
      startButton.disabled = true;
      startButton.style.cursor = 'not-allowed';
    }
  });
}
