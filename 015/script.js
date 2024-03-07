const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const gallows = [
  "head",
  "neck",
  "left-hand",
  "right-hand",
  "left-leg",
  "right-leg",
];

const keyboard = document.querySelector(".keyboard");
const wordsPart = document.querySelector(".context");
const wordContainer = document.querySelector(".context .word-container");
const word = document.querySelector(".context .word");
const hint = document.querySelector('.hint');
const mistakes = document.querySelector('.mistake');
const mistakeCounter = document.querySelector('.mistakeNum');
const pointsDisplay = document.querySelector(".points");
const progressRange = document.querySelector(".progress-range");
const winSound = document.getElementById('win');
const gameOverSound = document.getElementById('gameover');
const rightSound = document.getElementById('right');
const wrongSound = document.getElementById('wrong');

let inputs = [];
let keys = []; 

let currentIndex = 0; 
let mistake = 0; 
let gallowsIndex = -1;
let points = 0; 

//create the keyboard
function createKeyboard() {
  for (let i = 0; i < alphabet.length; i++) {
    const key = document.createElement("span");
    key.classList.add("key");
    key.textContent = alphabet[i];

    // Create a closure 
    const clickHandler = (letter) => {
      return () => {
        handleKeyClick(letter);
        key.style.backgroundColor = "rgb(100, 146, 212)";
      };
    };

    // Use the closure function as the click event listener
    key.addEventListener("click", clickHandler(alphabet[i]));

    keyboard.appendChild(key);
    keys.push(key);
  }
}

function handleKeyClick(key) {
  const currentWord = shuffledWords[currentIndex].word.toUpperCase();
  let isCorrect =false;


  for (let i = 0; i < currentWord.length; i++) {
    if (key == currentWord[i]) {
      index = i;
      inputs[i].textContent = key;
      isCorrect = true;
    }
  }

  checkWordCompletion();

  if (!isCorrect) {
    mistake += 1;
    gallowsIndex += 1;
    wrongSound.play();
    updateMistakes(mistakeCounter);
    paintGallows();
  }
  if (mistake === 6) {
     points = 0;
     updatePoints();
     gameOverSound.play();
     setTimeout(resetGame, 700);
  }
}


function showShuffledWords() {
  const currentWord = shuffledWords[currentIndex];
  console.log(currentWord.word);

  //to make inputs based on each word's letters
  for (let i = 0; i < currentWord.word.length; i++) {
    const letterInput = document.createElement("div");
    letterInput.classList.add("letter-input");
    letterInput.textContent = "_";

    word.appendChild(letterInput);
    inputs.push(letterInput);
  }

  //show the hint part

  hint.textContent = "Hint: " + currentWord.hint; // in


  //show mistakes part
  mistakeCounter.textContent = `${mistake}/6`; // in

  updateMistakes();
}



//to update mistakes counter
function updateMistakes() {
  mistakeCounter.textContent = `${mistake}/6`;
}

//to paint the body parts with every mistake
function paintGallows() {
  const className = gallows[gallowsIndex];
  const bodyPart = document.querySelector(`.${className}`);
  bodyPart.style.visibility = "visible";
}


function resetGame() {
  gallowsIndex = -1;
  mistake = 0;
  updateMistakes(mistake);

  //make the parts hidden
  for (const className of gallows) {
    const bodyPart = document.querySelector(`.${className}`);
    bodyPart.style.visibility = "hidden";
  }

  //reset keyboard colors
  for (const key of keys) {
    key.style.backgroundColor = "rgb(93, 99, 185)";
  }

  //clean word place
 for(let i = 0; i<inputs.length; i++){inputs[i].innerText='-';}
  const letters = document.querySelectorAll('.letter-input');
  letters.forEach(letter => word.removeChild(letter));
  inputs = [];
  showShuffledWords();
}





function checkWordCompletion() {
  const currentWord = shuffledWords[currentIndex];
  const wordInputs = inputs.map((input) => input.textContent).join("");

  if (wordInputs === currentWord.word.toUpperCase()) {
    // Word is correct
    points += 1;
    console.log(points);

    // Update game points display and make the mistakes counter 0
    updatePoints();
    mistake = 0;
    updateMistakes(mistake);

    // Move to the next word
    currentIndex = (currentIndex + 1) % shuffledWords.length;
    winSound.play();

    timeout = setTimeout(resetGame, 500);
  }
}

function updatePoints() {
  // points mitoone voroodi inn taabe bashe
  pointsDisplay.textContent = `${points}/50`;

  //the progress
  const percentage = (12.6 * points);
  progressRange.style.setProperty("--width",`${percentage}px`);

  //play level up sound
  rightSound.play();
}

function Init() {
  createKeyboard();
  showShuffledWords();
  updatePoints();
}

Init();
