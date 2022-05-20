//Напиши скрипт, який на момент сабміту форми викликає
//функцію createPromise(position, delay) стільки разів,
// скільки ввели в поле amount.
//Під час кожного виклику передай їй номер промісу(position), що створюється,
//і затримку, враховуючи першу затримку(delay),
// введену користувачем, і крок(step).
import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitAction);

let positionCount;
let delayCount;
let positions = [];

function onSubmitAction(evt) {
  evt.preventDefault();
  const firstDelay = parseInt(formRef.delay.value);
  const delay = parseInt(formRef.step.value);
  const promiseAmount = formRef.amount.value;

  // console.log(firstDelay);
  // console.log(delay);
  // console.log(promiseAmount);
  getPosition(promiseAmount, delay);

  const promises = positions.map(position => {
    createPromises(position.positionCount, position.delayCount);
  });

  Promise.all(promises);
  console.log(Promise.all(promises));

  evt.currentTarget.reset();
  positions = [];

  function getPosition(promiseAmount, delay) {
    for (let i = 0; i < promiseAmount; i++) {
      positionCount = i + 1;
      delayCount = firstDelay + delay * i;
      positions.push({ positionCount, delayCount });
      console.log(delayCount);
    }
    console.log(positions);
  }

  function createPromises(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
        } else {
          reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
        }
      }, delay);
    });
  }
}
