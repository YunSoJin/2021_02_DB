

const subtitle = document.getElementById("subtitle"),
  rangevalue = document.getElementById("js-range"),
  uservalue = document.getElementById("js-value"),
  messagebox = document.getElementById("message"),
  playBtn = document.getElementById("playBtn"),
  resultbox = document.getElementById("result");

rangevalue.addEventListener("input", getRange);
playBtn.addEventListener("click", play);

function getRange() {
  const range = rangevalue.value;
  subtitle.innerText = `Generate a number between 0 and ${range}`;
  return range;
}

function randomPicker() {
  const rand = Date.now() % getRange();
  return rand;
}

function play(event) {
  event.preventDefault();
  const random = randomPicker();
  messagebox.innerText = `You chose : ${uservalue.value}, the machine chose : ${random}.`;
    
  if (parseInt(uservalue.value) > random) {
    resultbox.innerText = `You Won!`;
  } else {
    resultbox.innerText = `You lost!`;
  }
}

function init() {
  getRange();
  randomPicker();
}

init();