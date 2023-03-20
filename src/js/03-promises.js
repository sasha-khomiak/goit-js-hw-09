// ----------МОДУЛІ---------- //
// підключаємо вікно-вспливачку
import Notiflix from 'notiflix';

// ----------ІНІЦІАЛІЗАЦІЯ---------- //
// елемент форм
const form = document.querySelector('.form');
let mainDelay = 0;

// ----------СЛУХАЧ ФОРМИ---------- //
// слухач на форму сабміт
form.addEventListener('submit', promiceGenerator);

// ----------ОБРОБНИК ДІЇ ФОРМИ---------- //
function promiceGenerator(event) {
  // скасовуємо перезавантаження сторінки
  event.preventDefault();

  //отримуємо дані з інпутів форми
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  // отримаємо цифрові значення введених даних
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  // присвоюємо затримці перше значення
  mainDelay = delayValue;

  // Цикл виклику промісів
  for (let i = 1; i <= amountValue; i += 1) {
    // викликаємо функцію промісту передаємо позицію і затримку від початку
    createPromise(i, mainDelay);
    // збільщуємо затримку на крок
    mainDelay += stepValue;
  }
}

// ----------ПРОМІСИ---------- //
function createPromise(position, delay) {
  const promice = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promice
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.success(`❌ Rejected promise ${position} in ${delay}ms`, {
        success: {
          background: '#ff5549',
        },
      });
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
