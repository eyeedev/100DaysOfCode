const square = document.querySelector(".square");
const rgbPlaceHolder = document.getElementById("rgb");
const hexPlaceHolder = document.getElementById("hex");
const firstSlider = document.getElementById("red");
const secondSlider = document.getElementById("green");
const thirdSlider = document.getElementById("blue");
const hue = document.getElementById("hue");
const saturation = document.getElementById("saturation");
const lightness = document.getElementById("lightness");
const hslPlaceHolder = document.getElementById("hsl");
const hslSquare = document.querySelector(".square-hsl");
const hslCard = document.querySelector(".hsl-card");

//read the slider value and turn back an object name newColor
function getColor() {
  return {
    red: parseInt(firstSlider.value),
    green: parseInt(secondSlider.value),
    blue: parseInt(thirdSlider.value),
  };
}

function colorToRGB(color) {
  return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

function colorToHEX(color) {
  const hexRed = color.red.toString(16).padStart(2, "0");
  const hexGreen = color.green.toString(16).padStart(2, "0");
  const hexBlue = color.blue.toString(16).padStart(2, "0");

  return `#${hexRed}${hexGreen}${hexBlue}`;
}

//sets the background color and text field value
function updateColor(color) {
  const rgbColor = colorToRGB(color);
  const hexColor = colorToHEX(color);

  square.style.backgroundColor = rgbColor;

  rgbPlaceHolder.value = rgbColor;
  hexPlaceHolder.value = hexColor;
}

function handleInputChange() {
  const newColor = getColor();
  updateColor(newColor);
  updateSliderColors(newColor);

  const newHSL = getHSLcolor();
  updateHSLcolor(newHSL);
  updateHSLsliderColors(newHSL);
}

//gradients
function updateSliderColors(color) {
  const R = color.red;
  const G = color.green;
  const B = color.blue;

  firstSlider.style.setProperty("--start-color", `rgb(0,${G}, ${B})`);
  firstSlider.style.setProperty("--end-color", `rgb(255,${G}, ${B})`);

  secondSlider.style.setProperty("--start-color", `rgb(${R}, 0, ${B})`);
  secondSlider.style.setProperty("--end-color", `rgb(${R}, 255, ${B})`);

  thirdSlider.style.setProperty("--start-color", `rgb(${R}, ${G}, 0)`);
  thirdSlider.style.setProperty("--end-color", `rgb(${R}, ${G}, 255)`);

  firstSlider.style.setProperty("--thumb-color", `rgb(${R},${G},${B})`);
  secondSlider.style.setProperty("--thumb-color", `rgb(${R},${G},${B})`);
  thirdSlider.style.setProperty("--thumb-color", `rgb(${R},${G},${B})`);
}

//HSB color

function getHSLcolor() {
  return {
    h: hue.value,
    s: saturation.value,
    l: lightness.value,
  };
}

function colorToHSL(HSL) {
  return `hsl(${HSL.h}deg, ${HSL.s}%, ${HSL.l}%)`;
}

function updateHSLcolor(HSL) {
  const hslColor = colorToHSL(HSL);

  hslSquare.style.backgroundColor = hslColor;
  hslPlaceHolder.value = hslColor;
}

function updateHSLsliderColors(HSL) {
  const H = HSL.h;
  const S = HSL.s;
  const L = HSL.l;

  hslCard.style.setProperty("--hue", `${H}deg`);
  hslCard.style.setProperty("--saturation", `${S}%`);
  hslCard.style.setProperty("--lightness", `${L}%`);

  hue.style.setProperty("--thumb-color", `hsl(${H}, ${S}%, ${L}%)`);
  saturation.style.setProperty("--thumb-color", `hsl(${H}, ${S}%, ${L}%)`);
  lightness.style.setProperty("--thumb-color", `hsl(${H}, ${S}%, ${L}%)`);
}



//set events
function Init() {
  const defaultRgbColor = getColor();
  updateColor(defaultRgbColor);
  updateSliderColors(defaultRgbColor);

  const defaultHslColor = getHSLcolor();
  updateHSLcolor(defaultHslColor);
  updateHSLsliderColors(defaultHslColor);


  firstSlider.addEventListener("input", handleInputChange);
  secondSlider.addEventListener("input", handleInputChange);
  thirdSlider.addEventListener("input", handleInputChange);
  hue.addEventListener("input", handleInputChange);
  saturation.addEventListener("input", handleInputChange);
  lightness.addEventListener("input", handleInputChange);

  hslPlaceHolder.addEventListener('click',copyCode);
  rgbPlaceHolder.addEventListener('click',copyCode);
  hexPlaceHolder.addEventListener('click',copyCode);
}

Init();


function copyCode(e){
  const colorCode = e.target.value;
  navigator.clipboard.writeText(colorCode);
  alert("Copied the text: " + colorCode);
}