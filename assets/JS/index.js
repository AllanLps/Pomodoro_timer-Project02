const buttonStart = document.querySelector(".button-start");
const buttonRestart = document.querySelector(".button-restart");
const buttonStop = document.querySelector(".button-stop");
const progressBar = document.querySelector(".progress-bar");
const timerDisplay = document.querySelector(".timer span");
const messagefocus = document.querySelector(".message span");
const buttonShortBreak = document.querySelector(".button-smallBreak");
const buttonPomodoro = document.querySelector(".button-pomodoro");
const buttonLongBreak = document.querySelector(".button-longBreak");

let intervalId;
let time = 25 * 60; // tempo inicial do timer em segundos
let isRunning = false; // variável para controlar se o timer está rodando ou não

function startTimer() {
  if (!isRunning) {
    // se o timer não está rodando
    isRunning = true;
    intervalId = setInterval(() => {
      time--; // decrementa o tempo a cada segundo
      updateTimerDisplay(time); // atualiza o display do timer
      if (time < 0) {
        clearInterval(intervalId);
        isRunning = false; // marca o timer como não rodando
      }
    }, 1000);
  } 

  messagefocus.textContent = "Timer iniciado!"
}

function stopTimer() {
  clearInterval(intervalId);
  isRunning = false;

  messagefocus.textContent = ""
}

function restartTimer() {
  let initialTime;
  if (buttonShortBreak.classList.contains("active")) {
    initialTime = 5;
  } else if (buttonLongBreak.classList.contains("active")) {
    initialTime = 15;
  } else {
    initialTime = 25;
  }

  time = initialTime * 60;
  timerDisplay.textContent = ("0" + initialTime).slice(-2) + ":00";

  messagefocus.textContent = ""
  stopTimer();
}

function updateTimerDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes; // adiciona um zero à esquerda se for menor que 10
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds; // adiciona um zero à esquerda se for menor que 10
  timerDisplay.textContent = `${minutesStr}:${secondsStr}`; // atualiza o display do timer
}

//pausa curta de 5 minutos

buttonShortBreak.addEventListener("click", () => {
  // Atualiza o temporizador para 5 minutos
  let initialTime = 5;
  time = initialTime * 60;
  timerDisplay.textContent = "05:00";

  // Remove a classe "active" do botão "pomodoro" e adiciona ao botão "short break"
  buttonPomodoro.classList.remove("active");
  buttonLongBreak.classList.remove("active");
  buttonShortBreak.classList.add("active");


  stopTimer();
});

//pausa longa de 15 minutos

buttonLongBreak.addEventListener("click", () => {
  let initialTime = 15;
  time = initialTime * 60;
  timerDisplay.textContent = "15:00";

  buttonPomodoro.classList.remove("active");
  buttonShortBreak.classList.remove("active");
  buttonLongBreak.classList.add("active");

  stopTimer();
});

//voltamos ao pomodoro

buttonPomodoro.addEventListener("click", () => {
  time = 25 * 60;
  updateTimerDisplay(time);

  buttonPomodoro.classList.add("active");
  buttonShortBreak.classList.remove("active");
  buttonLongBreak.classList.remove("active");

  messagefocus.textContent = "";

  stopTimer();
});

buttonStart.addEventListener("click", startTimer);
buttonStop.addEventListener("click", stopTimer);
buttonRestart.addEventListener("click", restartTimer);
