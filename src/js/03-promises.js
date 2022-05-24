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

  positions.map(position => {
    createPromise(position.positionCount, position.delayCount)
      .then(res => {
        Notiflix.Notify.success(res);
        console.log(res);
      })
      .catch(error => {
        Notiflix.Notify.failure(error);
        console.log(error);
      });
  });

  evt.currentTarget.reset();
  positions = [];

  function getPosition(promiseAmount, delay) {
    for (let i = 0; i < promiseAmount; i++) {
      positionCount = i + 1;
      delayCount = firstDelay + delay * i;
      positions.push({ positionCount, delayCount });
    }
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise ${position} in ${delay}ms`);
        }
      }, delay);
    });
  }
}
