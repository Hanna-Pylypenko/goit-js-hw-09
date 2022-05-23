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

  getPosition(promiseAmount, delay);

  const promises = positions.map(position => {
    createPromise(position.positionCount, position.delayCount);
    console.log(createPromise(position.positionCount, position.delayCount));
  });

  Promise.all(promises);
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

  function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
        } else {
          reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
        }
      }, delay);
    });
    return promise
      .then(() => console.log(`✅ Fulfilled promise ${position} in ${delay}ms`))
      .catch(() => console.log(`❌ Rejected promise ${position} in ${delay}ms`));
  }
}
