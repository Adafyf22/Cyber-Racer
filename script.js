const player = {
  speed: 0,
  acceleration: 0,
  handling: 0,
  money: 0
};

function updateStats() {
  document.getElementById('speed').textContent = player.speed;
  document.getElementById('acceleration').textContent = player.acceleration;
  document.getElementById('handling').textContent = player.handling;
  document.getElementById('money').textContent = player.money;
}

function log(message) {
  const logSection = document.getElementById('log');
  const entry = document.createElement('div');
  entry.textContent = message;
  logSection.prepend(entry);
}

// Car selection
const carOptions = document.querySelectorAll('.car-option');
carOptions.forEach(option => {
  option.addEventListener('click', () => {
    player.speed = parseInt(option.dataset.speed);
    player.acceleration = parseInt(option.dataset.acceleration);
    player.handling = parseInt(option.dataset.handling);
    document.getElementById('car-selection').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    updateStats();
    log(`You selected ${option.querySelector('h3').textContent}.`);
  });
});

// Race logic
function race() {
  const ai = {
    speed: 3 + Math.floor(Math.random() * 4),
    acceleration: 3 + Math.floor(Math.random() * 4),
    handling: 3 + Math.floor(Math.random() * 4)
  };

  const playerScore = player.speed * Math.random() + player.acceleration * 0.5 + player.handling * 0.3;
  const aiScore = ai.speed * Math.random() + ai.acceleration * 0.5 + ai.handling * 0.3;

  if (playerScore >= aiScore) {
    player.money += 100;
    log('You won the race! Earned 100 credits.');
  } else {
    log('You lost the race. Better luck next time.');
  }
  updateStats();
}

// Task logic
const tasks = [
  { name: 'Hack a Terminal', reward: 50 },
  { name: 'Deliver Data Package', reward: 40 },
  { name: 'Evade Drones', reward: 60 }
];

function doTask() {
  const task = tasks[Math.floor(Math.random() * tasks.length)];
  player.money += task.reward;
  log(`${task.name} completed! Earned ${task.reward} credits.`);
  updateStats();
}

// Shop logic
const shopItems = document.querySelectorAll('.shop-item');
shopItems.forEach(item => {
  item.addEventListener('click', () => {
    const cost = parseInt(item.dataset.cost);
    if (player.money < cost) {
      log('Not enough credits.');
      return;
    }
    player.money -= cost;
    const type = item.dataset.type;
    const value = parseInt(item.dataset.value);
    player[type] += value;
    log(`Purchased ${item.textContent.trim()}.`);
    updateStats();
  });
});

// Attach buttons
const raceBtn = document.getElementById('raceBtn');
const taskBtn = document.getElementById('taskBtn');
raceBtn.addEventListener('click', race);
taskBtn.addEventListener('click', doTask);
