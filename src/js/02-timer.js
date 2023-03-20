// ----------МОДУЛІ---------- //
// підключаємо flatpickr
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів flatpickr
import 'flatpickr/dist/flatpickr.min.css';
// підключаємо вікно-вспливачку
import Notiflix from 'notiflix';

// ----------ЕЛЕМЕНТИ---------- //
// створюємо елементи
const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const layoutDays = document.querySelector('[data-days]');
const layoutHours = document.querySelector('[data-hours]');
const layoutMinutes = document.querySelector('[data-minutes]');
const layoutSeconds = document.querySelector('[data-seconds]');

// ----------КОНСТАНТИ І ЗНАЧЕННЯ---------- //
// початковий стан - кнопка неактивна
btnStart.disabled = true;

// змінна для зберігання повного часу таймера
let totalTime = null;

// ідентифікатор інтервальної функції, щоб деактивувати при досягненні 0
let timer = null;

// крок таймера
const TIMER_STEP = 1000;

// ----------НАЛАШТУВАННЯ INPUT-BUTTON---------- //
// надаштування flatpickr;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // якщо дата раніше, то кнопку деактивуємо, виводимо повідомлення
    if (selectedDates[0] < new Date()) {
      btnStart.disabled = true;
      //   alert('Please choose a date in the future');
      Notiflix.Report.failure(
        'УПС!',
        'Оберіть майбутню дату зникнення русні!',
        'Обрати іншу дату',
        // чомусь таймаут не працює :((((
        {
          timeout: 3000,
        },
      );
      return;
    }
    // якщо дата майбутня, то кнопку активуємо і виносимо
    // значення лічильника в глобальну змінну
    else {
      btnStart.disabled = false;
      totalTime = selectedDates[0];
    }
  },
};

//  навішання на інпут нашого селектора дати за вищеописаними налаштуваннями
flatpickr('#datetime-picker', options);

// ----------CЛУХАЧ НАТИСКАННЯ КНОПКИ---------- //

btnStart.addEventListener('click', countDownTimer);

// ----------ЗАПУСК ЛІЧИЛЬНИКА---------- //

function countDownTimer() {
  timer = setInterval(() => {
    // рахуємо скільки лишилося до кінця
    let timeToEnd = totalTime - new Date();
    // Якщо лічильник менше 0, то припиняємо інтервальну ф-ію і виходимо
    if (timeToEnd < 0) {
      console.log('The end');
      clearInterval(timer);
      return;
    }

    // якщо лічильник більше 0 створюємо обʼєкт з дні-час до часу Х
    const timeObject = convertMs(timeToEnd);

    // викликаємо функцію виведення лічильника для користувача
    layOutCounter(timeObject);

    // виконуємо інтервальну іункцію з проміжком TIMER_STEP
  }, TIMER_STEP);
}

// ----------ФУНКЦІЯ ОБРОБКИ ДАТИ---------- //

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// ----------ФУНКЦІЯ ДОМАЛЬОВУВАННЯ НОЛИКА---------- //

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// ----------ФУНКЦІЯ ВИВЕДЕННЯ ДАТИ-ЧАСУ---------- //
function layOutCounter(timeObject) {
  // реструктуризуємо отриманий обʼєкт
  const { days, hours, minutes, seconds } = timeObject;

  // записуємо значення, прогнавши через ф-ію додавання нолика
  layoutDays.textContent = addLeadingZero(days);
  layoutHours.textContent = addLeadingZero(hours);
  layoutMinutes.textContent = addLeadingZero(minutes);
  layoutSeconds.textContent = addLeadingZero(seconds);
}
