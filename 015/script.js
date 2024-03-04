const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const wordsWithHints = [
    { word: 'programming', hint: 'Writing code to create software' },
    { word: 'keyboard', hint: 'Input device with keys' },
    { word: 'mountain', hint: 'Large landform that rises prominently above its surroundings' },
    { word: 'elephant', hint: 'A large, herbivorous mammal with tusks and a trunk' },
    { word: 'jazz', hint: 'A genre of music that originated in the African-American communities of New Orleans' },
    { word: 'galaxy', hint: 'A vast system of stars held together by gravitational forces' },
    { word: 'oxygen', hint: 'A chemical element with the symbol O and atomic number 8' },
    { word: 'guitar', hint: 'A stringed musical instrument with frets' },
    { word: 'astronomy', hint: 'The scientific study of celestial objects, such as stars, planets, and galaxies' },
    { word: 'umbrella', hint: 'A portable device used for protection against rain or sunlight' },
    { word: 'puzzle', hint: 'A game, toy, or problem designed to test ingenuity or knowledge' },
    { word: 'whale', hint: 'A large marine mammal with a streamlined body and a blowhole' },
    { word: 'camera', hint: 'A device used to capture images or record videos' },
    { word: 'architecture', hint: 'The art and science of designing and constructing buildings' },
    { word: 'chocolate', hint: 'A sweet food product made from roasted and ground cacao seeds' },
    { word: 'telephone', hint: 'A communication device that transmits sound over a distance' },
    { word: 'island', hint: 'A landmass surrounded by water' },
    { word: 'bicycle', hint: 'A human-powered vehicle with two wheels' },
    { word: 'symphony', hint: 'An extended musical composition for a full orchestra' },
    { word: 'robot', hint: 'A machine capable of carrying out tasks autonomously or with guidance' },
    { word: 'flower', hint: 'The reproductive structure of a flowering plant' },
    { word: 'fireworks', hint: 'Explosive devices used for entertainment, often in celebration' },
    { word: 'history', hint: 'The study of past events, particularly in human affairs' },
    { word: 'sunshine', hint: 'Direct sunlight or the warmth and light it provides' },
    { word: 'courage', hint: 'The ability to confront fear or adversity with bravery' },
    { word: 'compass', hint: 'An instrument used for navigation that shows direction relative to the Earth\'s magnetic poles' },
    { word: 'astronaut', hint: 'A person trained for space travel and exploration' },
    { word: 'miracle', hint: 'An extraordinary event attributed to a divine agency' },
    { word: 'journey', hint: 'A traveling from one place to another, usually taking a considerable amount of time' },
    { word: 'cactus', hint: 'A succulent plant with a thick, fleshy stem adapted to store water' },
    { word: 'adventure', hint: 'An exciting or unusual experience' },
    { word: 'globe', hint: 'A spherical representation of the Earth' },
    { word: 'festival', hint: 'A celebration or series of celebrations' },
    { word: 'volcano', hint: 'A mountain that erupts with lava, ash, and gases' },
    { word: 'fantasy', hint: 'A genre of imaginative fiction often involving magical elements' },
    { word: 'galaxy', hint: 'A vast system of stars held together by gravitational forces' },
    { word: 'harmony', hint: 'The combination of different musical notes played or sung simultaneously to produce a pleasing effect' },
    { word: 'magnet', hint: 'An object or device that produces a magnetic field' },
    { word: 'laughter', hint: 'The sound of joy expressed by the vocal chords' },
    { word: 'paradise', hint: 'An ideal or idyllic place or state' },
    { word: 'reflection', hint: 'The throwing back of light, sound, or heat by a surface' },
    { word: 'whisper', hint: 'Speaking in a soft or quiet voice' },
    { word: 'treasure', hint: 'A quantity of precious metals, gems, or other valuable objects' },
    { word: 'velocity', hint: 'The speed of an object in a particular direction' }
];

const keyboard = document.querySelector('.keyboard');
const wordsPart = document.querySelector('.context');
let regex = /[a-zA-Z]/g; 
let shuffledWords =[];
let currentIndex = 0;
let mistake = 0;

function createKeyboard(){
    for(let i = 0; i<alphabet.length ; i++){
        const key = document.createElement('span');
        key.classList.add('key');
        key.innerText = alphabet[i];
        
        key.addEventListener('click',()=>{
            //inja mikham meghdar key ro bede be in function
            handleKeyClick(alphabet[i])

            key.style.backgroundColor = 'rgb(100, 146, 212)';
        })
    
        keyboard.appendChild(key);
    }
}

function shuffleWords(){

 while(wordsWithHints.length>0){
    let randomIndex = Math.floor(Math.random()*wordsWithHints.length);
    shuffledWords.push(wordsWithHints[randomIndex]);
    wordsWithHints.splice(randomIndex,1);
 }

 
};
   

function showShuffledWords(){
    const currentWord = shuffledWords[currentIndex];

    const wordContainer = document.createElement('div');
    wordContainer.classList.add('word-container');

    const word = document.createElement('span');
    word.classList.add('word');

    for(let i = 0 ; i < (currentWord.word).length ; i++){
        const letterInput = document.createElement('input');
        letterInput.classList.add('letter-input');
        letterInput.value = '_';

        word.appendChild(letterInput);
       
    }


    const hint = document.createElement('span');
    hint.classList.add('hint');
    hint.innerText = 'Hint: ' + currentWord.hint;


    wordContainer.appendChild(word);
    wordContainer.appendChild(hint);
    wordsPart.appendChild(wordContainer);

    //inja ham ke kalame feli ro pass mide
    handleKeyClick(currentWord);

}

function handleKeyClick(currentWord,key){
   //inja key zade shode ro ba letter haye kalame moghayese kone ke
   //age yeki bood bezate dakhel input marboote


    const word = currentWord.word
    const wordContainer = document.querySelector('.word-container');
    const inputs = wordContainer.querySelectorAll('.letter-input');

    let letterArray = word.split(''); 

    console.log(key);
    


    console.log(letterArray);
    
   

}





function Init(){
    createKeyboard();
    shuffleWords();
    showShuffledWords();
    
}

Init();
