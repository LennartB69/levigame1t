// JavaScript code remains the same
let score = 0;
let clickPower = 1;
let multiplier = 1;
let gems = 0;
let autoClicker1Active = false;
let autoClicker2Active = false;
let autoClicker1Level = 1;
let autoClicker2Level = 1;
let highScores = [];
let achievements = [];
let lastClaimedDailyReward = 0;
let prestigePoints = 0;

const clickSound = document.getElementById('clickSound');
const buySound = document.getElementById('buySound');
const questCompleteSound = document.getElementById('questCompleteSound');
const bonusSound = document.getElementById('bonusSound');

// Upgrade Prices
let upgradeClickPowerPrice = 10;
let autoClicker1Price = 50;
let autoClicker2Price = 150;
let buyThemePrice = 50;

// Function to update the score display
function updateScore() {
    document.getElementById('score-display').innerText = `Score: ${score}`;
    localStorage.setItem('score', score);
}
// Function to update auto clicks per second display
function updateAutoClicksDisplay() {
    let autoClicksPerSecond = autoClicker1Level + (autoClicker2Level * 2);
    document.getElementById('auto-clicks-display').innerText = `Auto Clicks per Second: ${autoClicksPerSecond}`;
}

// Update the auto-click display whenever an auto-clicker is purchased or upgraded
document.getElementById('auto-clicker-1').onclick = function() {
    if (score >= autoClicker1Price) {
        score -= autoClicker1Price;
        autoClicker1Active = true;
        autoClicker1Level++;
        autoClicker1Price = Math.floor(autoClicker1Price * 1.5);
        updateScore();
        updatePrices();
        updateUpgrades();
        updateAutoClicksDisplay(); // Update auto-click display
        buySound.play();
    }
};

document.getElementById('auto-clicker-2').onclick = function() {
    if (score >= autoClicker2Price) {
        score -= autoClicker2Price;
        autoClicker2Active = true;
        autoClicker2Level++;
        autoClicker2Price = Math.floor(autoClicker2Price * 1.5);
        updateScore();
        updatePrices();
        updateUpgrades();
        updateAutoClicksDisplay(); // Update auto-click display
        buySound.play();
    }
};

// Initialize auto-clicks display on page load
initializeGame();
updateAutoClicksDisplay();

// Function to update gems display
function updateGems() {
    document.getElementById('gems-display').innerText = `Gems: ${gems}`;
    localStorage.setItem('gems', gems);
}

// Function to update click power display
function updateClickPower() {
    document.getElementById('click-power-display').innerText = `Click Power: ${clickPower}`;
    localStorage.setItem('clickPower', clickPower);
}

// Function to update prices on the buttons
function updatePrices() {
    document.getElementById('upgrade-click-power-price').innerText = `Price: ${upgradeClickPowerPrice}`;
    document.getElementById('auto-clicker-1-price').innerText = `Price: ${autoClicker1Price}`;
    document.getElementById('auto-clicker-2-price').innerText = `Price: ${autoClicker2Price}`;
}

// Function to update upgrade levels
function updateUpgrades() {
    document.getElementById('auto-clicker-1-level').innerText = `Level: ${autoClicker1Level}`;
    document.getElementById('auto-clicker-2-level').innerText = `Level: ${autoClicker2Level}`;
}

// Function for click event
document.getElementById('click-button').onclick = function() {
    score += clickPower * multiplier;
    updateScore();
    clickSound.play();
};

// Event listeners for upgrades
document.getElementById('upgrade-click-power').onclick = function() {
    if (score >= upgradeClickPowerPrice) {
        score -= upgradeClickPowerPrice;
        clickPower++;
        upgradeClickPowerPrice = Math.floor(upgradeClickPowerPrice * 1.5);
        updateScores();
        updatePrices();
        updateClickPower();
        buySound.play();
    }
};

document.getElementById('auto-clicker-1').onclick = function() {
    if (score >= autoClicker1Price) {
        score -= autoClicker1Price;
        autoClicker1Active = true;
        autoClicker1Level++;
        autoClicker1Price = Math.floor(autoClicker1Price * 1.5);
        updateScores();
        updatePrices();
        updateUpgrades();
        buySound.play();
    }
};

document.getElementById('auto-clicker-2').onclick = function() {
    if (score >= autoClicker2Price) {
        score -= autoClicker2Price;
        autoClicker2Active = true;
        autoClicker2Level++;
        autoClicker2Price = Math.floor(autoClicker2Price * 1.5);
        updateScores();
        updatePrices();
        updateUpgrades();
        buySound.play();
    }
};

// Auto clicker functionality
setInterval(function() {
    if (autoClicker1Active) {
        score += autoClicker1Level;
        updateScore();
    }
}, 1000);

setInterval(function() {
    if (autoClicker2Active) {
        score += autoClicker2Level;
        updateScore();
    }
}, 500);

// Daily rewards and other functionalities can be added here

// Initialize game state from localStorage
function initializeGame() {
    score = parseInt(localStorage.getItem('score')) || 0;
    gems = parseInt(localStorage.getItem('gems')) || 0;
    clickPower = parseInt(localStorage.getItem('clickPower')) || 1;
    autoClicker1Level = parseInt(localStorage.getItem('autoClicker1Level')) || 1;
    autoClicker2Level = parseInt(localStorage.getItem('autoClicker2Level')) || 1;
    updateScore();
    updateGems();
    updateClickPower();
    updatePrices();
    updateUpgrades();
    updateAutoClicksDisplay(); // Ensure display is updated on load
}

initializeGame();
