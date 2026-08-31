// Load audio list
const audioSelect = document.getElementById('audioSelect');

function populateDropdown(list) {
  audioSelect.innerHTML = '';
  list.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.file;
    opt.textContent = item.name;
    audioSelect.appendChild(opt);
  });
}

fetch('audios.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('audios.json not found or invalid.');
    }
    return response.json();
  })
  .then(list => {
    populateDropdown(list);
  })
  .catch(error => {
    console.warn('Error loading audios.json:', error);
const fallback = [
  { name: 'Door Knock', file: 'audio/doorknock.mp3' },
  { name: 'Door Knock 2', file: 'audio/doorknock2.mp3' },
  { name: 'FNAF Foxy', file: 'audio/fnaf-foxy-sfx.mp3' },
  { name: 'Balloon Boy Hi', file: 'audio/fnafbb.mp3' },
  { name: 'Minecraft Cave Sound', file: 'audio/mc-cave.mp3' },
  { name: 'Minecraft Villager', file: 'audio/mc-villager.mp3' },
  { name: 'Metal Pipe Falling', file: 'audio/pipe.mp3' },
  { name: 'Spongebob Horn', file: 'audio/spongebob-horn.mp3' },
  { name: 'Taco Bell Bong', file: 'audio/taco-bell.mp3' },
  { name: 'Windows 7 Error', file: 'audio/win7-error.mp3' },
  { name: 'Windows 10 Error', file: 'audio/win10-error.mp3' }
];
    populateDropdown(fallback);
  });

const intervalInput = document.getElementById('interval');
const triggerChanceSelect = document.getElementById('triggerChance');
const testSoundBtn = document.getElementById('testSoundBtn');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const timerDisplay = document.getElementById('timerDisplay');

let intervalId = null;
let countdown = 0;
let audio = new Audio();

function getAudioUrl() {
  return audioSelect.value;
}

function playSound() {
  const url = getAudioUrl();
  if (!url) {
    return false;
  }

  audio.src = url;
  audio.play()
    .catch((err) => {
      console.warn('Audio error:', err);
    });
  return true;
}

testSoundBtn.addEventListener('click', playSound);

function tick() {
  countdown--;
  timerDisplay.textContent = countdown;

  if (countdown <= 0) {
    const chance = parseInt(triggerChanceSelect.value);
    const shouldPlay = Math.random() * 100 < chance;
    
    if (shouldPlay) {
      playSound();
    }

    let intervalSec = parseInt(intervalInput.value) || 10;
    if (intervalSec < 5) intervalSec = 5;
    countdown = intervalSec;
    timerDisplay.textContent = countdown;
  }
}

function start() {
  const url = getAudioUrl();
  if (!url) {
    // Não há statusMsg, podemos apenas retornar ou mostrar um alerta?
    // Vou usar console.log ou simplesmente retornar.
    console.warn('No audio selected!');
    return;
  }

  if (intervalId) return;

  let intervalSec = parseInt(intervalInput.value) || 10;
  if (intervalSec < 5) intervalSec = 5;
  countdown = intervalSec;
  timerDisplay.textContent = countdown;

  startBtn.disabled = true;
  stopBtn.disabled = false;
  audioSelect.disabled = true;
  intervalInput.disabled = true;
  triggerChanceSelect.disabled = true;
  testSoundBtn.disabled = true;

  intervalId = setInterval(tick, 1000);
}

function stop() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  timerDisplay.textContent = '--';
  
  startBtn.disabled = false;
  stopBtn.disabled = true;
  audioSelect.disabled = false;
  intervalInput.disabled = false;
  triggerChanceSelect.disabled = false;
  testSoundBtn.disabled = false;
  
  audio.pause();
  audio.currentTime = 0;
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);