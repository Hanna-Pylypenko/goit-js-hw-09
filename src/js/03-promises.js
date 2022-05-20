//Напиши скрипт, який на момент сабміту форми викликає
//функцію createPromise(position, delay) стільки разів,
// скільки ввели в поле amount.
//Під час кожного виклику передай їй номер промісу(position), що створюється,
//і затримку, враховуючи першу затримку(delay),
// введену користувачем, і крок(step).
import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
formRef.addEventListener('input', onInputAction);
formRef.addEventListener('submit', createPromises);

let firstDelay;
let delay;
let promiseAmount;

function onInputAction(evt) {
  if (evt.target.name === 'delay') {
    firstDelay = evt.target.value;
  } else if (evt.target.name === 'step') {
    delay = evt.target.value;
  } else {
    promiseAmount = evt.target.value;
  }
}
let positions = [];
for (let i = 0; i <= promiseAmount; i = 1) {
  const position = i;
  positions.push(position);
}

function createPromises(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve;
      } else {
        reject;
      }
    }, firstDelay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

Notiflix.Notify.init({
  width: '280px',
  position: 'top-right',
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '13px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'from-right',
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'shadow',
  fontAwesomeIconSize: '34px',

  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});
