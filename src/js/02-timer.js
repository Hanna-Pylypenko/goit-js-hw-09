import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
startBtn.addEventListener('click', onBtnClick);

const daysNumber = document.querySelector('[data-days]');
const hoursNumber = document.querySelector('[data-hours]');
const minsNumber = document.querySelector('[data-minutes]');
const secNumber = document.querySelector('[data-seconds]');

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
      Notiflix.Notify.failure('Please choose a date in the future');
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

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
