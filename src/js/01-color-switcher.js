const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let intrvlId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  intrvlId = setInterval(colorChange, 1000);
  startButton.disabled = true;
});

stopButton.addEventListener('click', () => {
  clearInterval(intrvlId);
  startButton.disabled = false;
});

function colorChange() {
  document.body.style.backgroundColor = getRandomHexColor();
}
