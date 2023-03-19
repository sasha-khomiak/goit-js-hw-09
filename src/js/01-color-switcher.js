// створюємо елементи
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

// деактивуємо на початковий стан кнопку стоп
console.dir(stopBtn);
stopBtn.disabled = true;

// задаємо ідентифікатор нашого інтервального таймера
let intervalId = null;

// слухач на кнопку старт
startBtn.addEventListener('click', startChangeColor);

// слухач на кнопку стоп
stopBtn.addEventListener('click', stopChangeColor);

// обробник зміни кольору
function startChangeColor() {
  // деактивуємо старт, активуємо стоп
  stopBtn.disabled = false;
  startBtn.disabled = true;

  // інтервал - генеруємо корір - присвоюємо боді - консулюю колір
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
    console.log('color: ', randomColor);
  }, 1000);
}

// зупинка зміни кольору
function stopChangeColor() {
  // деактивуємо стоп, активуємо старт
  startBtn.disabled = false;
  stopBtn.disabled = true;

  // очищуємо інтервальний таймер
  clearInterval(intervalId);
}

// функція генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
