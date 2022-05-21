import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
startBtn.addEventListener('click', onBtnClick);

let daysNumber = document.querySelector('[data-days]');
let hoursNumber = document.querySelector('[data-hours]');
let minsNumber = document.querySelector('[data-minutes]');
let secNumber = document.querySelector('[data-seconds]');

let selectedDatesData;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDatesData = selectedDates[0].getTime();

    if (selectedDates[0].getTime() - Date.now() > 0) {
      startBtn.disabled = false;
    } else {
      Notiflix.Notify.failure('Please, choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

function onBtnClick() {
  setInterval(() => {
    let ms = selectedDatesData - Date.now();
    const { days, hours, minutes, seconds } = convertMs(ms);

    daysNumber.textContent = days;
    hoursNumber.textContent = hours;
    minsNumber.textContent = minutes;
    secNumber.textContent = seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let days = Math.floor(ms / day);
  let hours = Math.floor((ms % day) / hour);
  let minutes = Math.floor(((ms % day) % hour) / minute);
  let seconds = Math.floor((((ms % day) % hour) % minute) / second);

  if (days < 10) {
    days = addLeadingZero(days);
  }
  if (hours < 10) {
    hours = addLeadingZero(hours);
  }
  if (minutes < 10) {
    minutes = addLeadingZero(minutes);
  }
  if (seconds < 10) {
    seconds = addLeadingZero(seconds);
  }
  console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

Notiflix.Notify.init({
  width: '280px',
  position: 'center-center',
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
  cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
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
