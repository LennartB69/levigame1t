// Game Variables
let score = 0;
let clickPower = 1;
let multiplier = 1;
let gems = 0;
let highScores = [];
let achievements = [];
let lastClaimedDailyReward = 0;
let prestigePoints = 0;

// Sounds
const clickSound = document.getElementById('clickSound');
const buySound = document.getElementById('buySound');
const questCompleteSound = document.getElementById('questCompleteSound');
const bonusSound = document.getElementById('bonusSound');

// Auto Clicker Objects
const autoClicker1 = {
    active: false,
    level: 1,
    price: 50,
    getAutoClicks: function() {
        return this.level;
    }
};

const autoClicker2 = {
    active: false,
    level: 1,
    price: 150,
    getAutoClicks: function() {
        return this.level * 2;
    }
};

// Upgrade Prices
let upgradeClickPowerPrice = 10;
const autoClickerPriceMultiplier = 1.5;

// Function to update the score display
function updateScore() {
    document.getElementById('score-display').innerText = `Score: ${score}`;
    localStorage.setItem('score', score);
}

// Function to update auto clicks per second display
function updateAutoClicksDisplay() {
    let autoClicksPerSecond = autoClicker1.getAutoClicks() + autoClicker2.getAutoClicks();
    document.getElementById('auto-clicks-display').innerText = `Auto Clicks per Second: ${autoClicksPerSecond}`;
}

// Purchase function for auto-clickers
function purchaseAutoClicker(autoClicker) {
    if (score >= autoClicker.price) {
        score -= autoClicker.price;
        autoClicker.active = true;
        autoClicker.level++;
        autoClicker.price = Math.floor(autoClicker.price * autoClickerPriceMultiplier);
        updateScore();
        updatePrices();
        updateUpgrades();
        updateAutoClicksDisplay();
        buySound.play();
    } else {
        alert("Not enough score to purchase!");
    }
}

// Event listeners for auto-clickers
document.getElementById('auto-clicker-1').onclick = function() {
    purchaseAutoClicker(autoClicker1);
};

document.getElementById('auto-clicker-2').onclick = function() {
    purchaseAutoClicker(autoClicker2);
};

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
    document.getElementById('auto-clicker-1-price').innerText = `Price: ${autoClicker1.price}`;
    document.getElementById('auto-clicker-2-price').innerText = `Price: ${autoClicker2.price}`;
}

// Function to update upgrade levels
function updateUpgrades() {
    document.getElementById('auto-clicker-1-level').innerText = `Level: ${autoClicker1.level}`;
    document.getElementById('auto-clicker-2-level').innerText = `Level: ${autoClicker2.level}`;
}

// Function for click event
document.getElementById('click-button').onclick = function() {
    score += clickPower * multiplier;
    updateScore();
    clickSound.play();
};

// Event listener for upgrading click power
document.getElementById('upgrade-click-power').onclick = function() {
    if (score >= upgradeClickPowerPrice) {
        score -= upgradeClickPowerPrice;
        clickPower++;
        upgradeClickPowerPrice = Math.floor(upgradeClickPowerPrice * 1.5);
        updateScore();
        updatePrices();
        updateClickPower();
        buySound.play();
    } else {
        alert("Not enough score to upgrade click power!");
    }
};

// Auto clicker functionality
setInterval(function() {
    if (autoClicker1.active) {
        score += autoClicker1.getAutoClicks();
        updateScore();
    }
}, 1000);

setInterval(function() {
    if (autoClicker2.active) {
        score += autoClicker2.getAutoClicks();
        updateScore();
    }
}, 500);

// Daily rewards function
function claimDailyReward() {
    const currentDate = new Date().getTime();
    if (currentDate - lastClaimedDailyReward >= 86400000) { // 24 hours in milliseconds
        gems += 10; // Reward example
        lastClaimedDailyReward = currentDate;
        updateGems();
        alert("You've claimed your daily reward of 10 gems!");
    } else {
        alert("You can claim your daily reward again in " + Math.ceil((86400000 - (currentDate - lastClaimedDailyReward)) / 3600000) + " hours.");
    }
}

// Initialize game state from localStorage
function initializeGame() {
    score = parseInt(localStorage.getItem('score')) || 0;
    gems = parseInt(localStorage.getItem('gems')) || 0;
    clickPower = parseInt(localStorage.getItem('clickPower')) || 1;
    autoClicker1.level = parseInt(localStorage.getItem('autoClicker1Level')) || 1;
    autoClicker2.level = parseInt(localStorage.getItem('autoClicker2Level')) || 1;
    autoClicker1.price = parseInt(localStorage.getItem('autoClicker1Price')) || 50;
    autoClicker2.price = parseInt(localStorage.getItem('autoClicker2Price')) || 150;
    lastClaimedDailyReward = parseInt(localStorage.getItem('lastClaimedDailyReward')) || 0;

    updateScore();
    updateGems();
    updateClickPower();
    updatePrices();
    updateUpgrades();
    updateAutoClicksDisplay(); // Ensure display is updated on load
}

initializeGame();
