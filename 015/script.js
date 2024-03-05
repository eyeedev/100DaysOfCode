const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const wordsWithHints = [
  { word: "programming", hint: "Writing code to create software" },
  { word: "keyboard", hint: "Input device with keys" },
  {
    word: "mountain",
    hint: "Large landform that rises prominently above its surroundings",
  },
  {
    word: "elephant",
    hint: "A large, herbivorous mammal with tusks and a trunk",
  },
  {
    word: "jazz",
    hint: "A genre of music that originated in the African-American communities of New Orleans",
  },
  {
    word: "galaxy",
    hint: "A vast system of stars held together by gravitational forces",
  },
  {
    word: "oxygen",
    hint: "A chemical element with the symbol O and atomic number 8",
  },
  { word: "guitar", hint: "A stringed musical instrument with frets" },
  {
    word: "astronomy",
    hint: "The scientific study of celestial objects, such as stars, planets, and galaxies",
  },
  {
    word: "umbrella",
    hint: "A portable device used for protection against rain or sunlight",
  },
  {
    word: "puzzle",
    hint: "A game, toy, or problem designed to test ingenuity or knowledge",
  },
  {
    word: "whale",
    hint: "A large marine mammal with a streamlined body and a blowhole",
  },
  { word: "camera", hint: "A device used to capture images or record videos" },
  {
    word: "architecture",
    hint: "The art and science of designing and constructing buildings",
  },
  {
    word: "chocolate",
    hint: "A sweet food product made from roasted and ground cacao seeds",
  },
  {
    word: "telephone",
    hint: "A communication device that transmits sound over a distance",
  },
  { word: "island", hint: "A landmass surrounded by water" },
  { word: "bicycle", hint: "A human-powered vehicle with two wheels" },
  {
    word: "symphony",
    hint: "An extended musical composition for a full orchestra",
  },
  {
    word: "robot",
    hint: "A machine capable of carrying out tasks autonomously or with guidance",
  },
  { word: "flower", hint: "The reproductive structure of a flowering plant" },
  {
    word: "fireworks",
    hint: "Explosive devices used for entertainment, often in celebration",
  },
  {
    word: "history",
    hint: "The study of past events, particularly in human affairs",
  },
  {
    word: "sunshine",
    hint: "Direct sunlight or the warmth and light it provides",
  },
  {
    word: "courage",
    hint: "The ability to confront fear or adversity with bravery",
  },
  {
    word: "compass",
    hint: "An instrument used for navigation that shows direction relative to the Earth's magnetic poles",
  },
  {
    word: "astronaut",
    hint: "A person trained for space travel and exploration",
  },
  {
    word: "miracle",
    hint: "An extraordinary event attributed to a divine agency",
  },
  {
    word: "journey",
    hint: "A traveling from one place to another, usually taking a considerable amount of time",
  },
  {
    word: "cactus",
    hint: "A succulent plant with a thick, fleshy stem adapted to store water",
  },
  { word: "adventure", hint: "An exciting or unusual experience" },
  { word: "globe", hint: "A spherical representation of the Earth" },
  { word: "festival", hint: "A celebration or series of celebrations" },
  { word: "volcano", hint: "A mountain that erupts with lava, ash, and gases" },
  {
    word: "fantasy",
    hint: "A genre of imaginative fiction often involving magical elements",
  },
  {
    word: "galaxy",
    hint: "A vast system of stars held together by gravitational forces",
  },
  {
    word: "harmony",
    hint: "The combination of different musical notes played or sung simultaneously to produce a pleasing effect",
  },
  {
    word: "magnet",
    hint: "An object or device that produces a magnetic field",
  },
  { word: "laughter", hint: "The sound of joy expressed by the vocal chords" },
  { word: "paradise", hint: "An ideal or idyllic place or state" },
  {
    word: "reflection",
    hint: "The throwing back of light, sound, or heat by a surface",
  },
  { word: "whisper", hint: "Speaking in a soft or quiet voice" },
  {
    word: "treasure",
    hint: "A quantity of precious metals, gems, or other valuable objects",
  },
  {
    word: "velocity",
    hint: "The speed of an object in a particular direction",
  },
];
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
let regex = /[a-zA-Z]/g;
let shuffledWords = [];
let inputs = [];
let keys = [];
let mistakeNum;
let currentIndex = 0;
let mistake = 0;
let index = 0;
let gallowsIndex = -1;
let isCorrect = false;
let points = 0;

//create the keyboard
function createKeyboard() {
  for (let i = 0; i < alphabet.length; i++) {
    const key = document.createElement("span");
    key.classList.add("key");
    key.innerText = alphabet[i];

    key.addEventListener("click", (e) => {
      handleKeyClick(e.target.innerText);

      key.style.backgroundColor = "rgb(100, 146, 212)";
    });

    keyboard.appendChild(key);
    keys.push(key);
  }
}

//shuffle the words array
function shuffleWords() {
  while (wordsWithHints.length > 0) {
    let randomIndex = Math.floor(Math.random() * wordsWithHints.length);
    shuffledWords.push(wordsWithHints[randomIndex]);
    wordsWithHints.splice(randomIndex, 1);
  }
}


function removePreviousElements() {
  const wordContainer = document.querySelector(".word-container");
  wordsPart.removeChild(wordContainer);

  createWordContainer();
  showShuffledWords();

  //make the keyboard look back
  for (const key of keys) {
    key.style.backgroundColor = "rgb(93, 99, 185)";
  }
}


function createWordContainer() {
  const wordContainer = document.createElement("div");
  wordContainer.classList.add("word-container");
  wordsPart.appendChild(wordContainer);

  const word = document.createElement("span");
  word.classList.add("word");
  wordContainer.appendChild(word);
}

function showShuffledWords() {
  const wordContainer = document.querySelector(".word-container");
  const word = document.querySelector(".word");

  const currentWord = shuffledWords[currentIndex];

  //to make inputs based on each word's letters
  for (let i = 0; i < currentWord.word.length; i++) {
    const letterInput = document.createElement("input");
    letterInput.classList.add("letter-input");
    letterInput.value = "_";

    word.appendChild(letterInput);
    inputs.push(letterInput);
  }
  //in order to split the word to an array of letters
  splitWord(currentWord);
  console.log(currentWord.word);

  //show the hint part
  const hint = document.createElement("span");
  hint.classList.add("hint");
  hint.innerText = "Hint: " + currentWord.hint;
  wordContainer.appendChild(hint);

  //show mistakes part
  const mistakes = document.createElement("span");
  mistakes.classList.add("mistakes");

  mistakeNum = document.createElement("span");
  mistakeNum.classList.add("mistakesNum");
  mistakeNum.innerText = `${mistake}/6`;
  mistakes.innerText = "Incorrect guesses: ";
  wordContainer.appendChild(mistakes);
  mistakes.appendChild(mistakeNum);
  updateMistakes(mistakeNum);
}



let lettersArray = [];

function splitWord(currentWord) {
  const word = currentWord.word;
  lettersArray = word.toUpperCase().split("");
}

//to update mistakes counter
function updateMistakes(mistakeNum) {
  mistakeNum.innerText = `${mistake}/6`;
}

//tp paint the body parts with every mistake
function paintGallows() {
  const className = gallows[gallowsIndex];
  const bodyPart = document.querySelector(`.${className}`);
  bodyPart.style.visibility = "visible";
}


function resetGame() {
  gallowsIndex = -1;
  mistake = 0;
  updateMistakes(mistakeNum);

  //make the parts hidden
  for (const className of gallows) {
    const bodyPart = document.querySelector(`.${className}`);
    bodyPart.style.visibility = "hidden";
  }

  //reset keyboard colors
  for (const key of keys) {
    key.style.backgroundColor = "rgb(93, 99, 185)";
  }
}



function handleKeyClick(key) {
  isCorrect = false;
  let timeout;
  for (let i = 0; i < lettersArray.length; i++) {
    if (key == lettersArray[i]) {
      index = i;
      inputs[i].value = key;
      isCorrect = true;
    }
  }

  checkWordCompletion();

  if (!isCorrect) {
    mistake += 1;
    gallowsIndex += 1;
    updateMistakes(mistakeNum);
    paintGallows();
  }
  if (mistake === 6) {
    timeout = setTimeout(resetGame, 700);
  }
}

function checkWordCompletion() {
  const currentWord = shuffledWords[currentIndex];
  const wordInputs = inputs.map((input) => input.value).join("");

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
    shuffleWords();
    removePreviousElements();
  }
}

function updatePoints() {
  const pointsDisplay = document.querySelector(".points");
  pointsDisplay.innerText = `${points}/50`;
}

function Init() {
  createKeyboard();
  createWordContainer();
  shuffleWords();
  showShuffledWords();
  updatePoints();
}

Init();
