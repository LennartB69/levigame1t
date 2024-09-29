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
let autoClicker2Price = 100;
let buyThemePrice = 50;

// Function to update the score display
function updateScore() {
    document.getElementById('score-display').innerText = `Score: ${score}`;
    localStorage.setItem('score', score);
}

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
    document.getElementById('buy-theme-price').innerText = `Price: ${buyThemePrice} Gems`;
}

// Function to update upgrade levels on the buttons
function updateUpgrades() {
    document.getElementById('upgrade-click-power-level').innerText = `Level: ${clickPower}`;
    document.getElementById('auto-clicker-1-level').innerText = `Level: ${autoClicker1Level}`;
    document.getElementById('auto-clicker-2-level').innerText = `Level: ${autoClicker2Level}`;
}

// Function to update the leaderboard
function updateLeaderboard() {
    const leaderboard = document.getElementById('high-scores');
    leaderboard.innerHTML = '';
    highScores.forEach((score, index) => {
        leaderboard.innerHTML += `<li>Rank ${index + 1}: ${score} points</li>`;
    });
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Function to handle achievements
function checkAchievements() {
    const achievementList = document.getElementById('achievement-list');
    achievementList.innerHTML = '';
    if (score >= 1000 && !achievements.includes('1000 Points Achievement')) {
        achievements.push('1000 Points Achievement');
        gems += 50;
        updateGems();
        achievementList.innerHTML += '<li>1000 Points Achievement Unlocked! +50 Gems</li>';
    }
    if (score >= 10000 && !achievements.includes('10000 Points Achievement')) {
        achievements.push('10000 Points Achievement');
        gems += 100;
        updateGems();
        achievementList.innerHTML += '<li>10000 Points Achievement Unlocked! +100 Gems</li>';
    }
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

// Function to handle click button press
document.getElementById('click-button').addEventListener('click', function() {
    clickSound.play();  // Play click sound
    score += clickPower * multiplier;
    updateScore();
    updateUpgrades();
    checkAchievements();
});

// Handle upgrade click power
document.getElementById('upgrade-click-power').addEventListener('click', function() {
    if (score >= upgradeClickPowerPrice) {
        score -= upgradeClickPowerPrice;
        clickPower++;
        upgradeClickPowerPrice += Math.floor(upgradeClickPowerPrice * 0.2); // Increase price by 20%
        localStorage.setItem('clickPower', clickPower);
        updateScore();
        updateClickPower();
        updatePrices();
        updateUpgrades();
        buySound.play(); // Play buy sound
    }
});

// Handle auto clicker 1 upgrade
document.getElementById('auto-clicker-1').addEventListener('click', function() {
    if (score >= autoClicker1Price) {
        score -= autoClicker1Price;
        autoClicker1Active = true;
        autoClicker1Price += Math.floor(autoClicker1Price * 0.2); // Increase price by 20%
        setInterval(() => {
            if (autoClicker1Active) {
                score += autoClicker1Level;
                updateScore();
                checkAchievements();
            }
        }, 1000); // 1 click per second
        updateScore();
        updatePrices();
        updateUpgrades();
        buySound.play(); // Play buy sound
    }
});

// Handle auto clicker 2 upgrade
document.getElementById('auto-clicker-2').addEventListener('click', function() {
    if (score >= autoClicker2Price) {
        score -= autoClicker2Price;
        autoClicker2Active = true;
        autoClicker2Price += Math.floor(autoClicker2Price * 0.2); // Increase price by 20%
        setInterval(() => {
            if (autoClicker2Active) {
                score += autoClicker2Level * 2;
                updateScore();
                checkAchievements();
            }
        }, 500); // 2 clicks per second
        updateScore();
        updatePrices();
        updateUpgrades();
        buySound.play(); // Play buy sound
    }
});

// Handle prestige
document.getElementById('prestige').addEventListener('click', function() {
    if (score >= 1000) {
        highScores.push(score);
        multiplier *= 2;
        score = 0;
        clickPower = 1;
        autoClicker1Active = false;
        autoClicker2Active = false;
        localStorage.setItem('multiplier', multiplier);
        localStorage.setItem('score', score);
        localStorage.setItem('clickPower', clickPower);
        localStorage.setItem('autoClicker1Active', autoClicker1Active);
        localStorage.setItem('autoClicker2Active', autoClicker2Active);
        updateScore();
        updateClickPower();
        updateUpgrades();
        updateLeaderboard();
        document.getElementById('event-message').innerText = `Prestige! Your multiplier is now ${multiplier}x`;
        buySound.play(); // Play buy sound
    }
});

// Handle prestige shop upgrades
document.getElementById('prestige-upgrade-click-power').addEventListener('click', function() {
    if (prestigePoints >= 5) {
        prestigePoints -= 5;
        clickPower += 1; // Permanently increase click power
        updateClickPower();
        localStorage.setItem('prestigePoints', prestigePoints);
    }
});

document.getElementById('prestige-upgrade-auto-clicker').addEventListener('click', function() {
    if (prestigePoints >= 10) {
        prestigePoints -= 10;
        autoClicker1Level += 1; // Permanently increase auto-clicker speed
        autoClicker2Level += 1;
        updateUpgrades();
        localStorage.setItem('prestigePoints', prestigePoints);
    }
});

// Handle buying themes
document.getElementById('buy-theme').addEventListener('click', function() {
    if (gems >= buyThemePrice) {
        gems -= buyThemePrice;
        updateGems();
        document.body.style.backgroundColor = getRandomColor();
        buySound.play(); // Play buy sound
    }
});

// Random color generator for themes
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to handle daily quests
function generateDailyQuests() {
    const quests = [
        { description: "Click 500 times", reward: 10 },
        { description: "Earn 1000 points", reward: 20 },
        { description: "Buy 5 upgrades", reward: 15 },
    ];

    const questList = document.getElementById('quest-list');
    questList.innerHTML = '';

    quests.forEach((quest, index) => {
        questList.innerHTML += `<li id="quest-${index}">${quest.description} - Reward: ${quest.reward} Gems</li>`;
    });

    localStorage.setItem('dailyQuests', JSON.stringify(quests));
}

// Function to check daily quests
function checkDailyQuests() {
    const quests = JSON.parse(localStorage.getItem('dailyQuests'));
    quests.forEach((quest, index) => {
        if (quest.description === "Click 500 times" && score >= 500) {
            document.getElementById(`quest-${index}`).style.textDecoration = "line-through";
            gems += quest.reward;
            updateGems();
            questCompleteSound.play(); // Play quest complete sound
        }
        // Add similar checks for other quests
    });
}

// Timed bonuses function
function spawnTimedBonus() {
    const bonusTypes = ['golden-click', 'bonus-points'];
    const selectedBonus = bonusTypes[Math.floor(Math.random() * bonusTypes.length)];
    const bonusElement = document.createElement('div');
    bonusElement.className = `timed-bonus ${selectedBonus}`;
    bonusElement.innerText = selectedBonus === 'golden-click' ? 'Golden Click!' : 'Bonus Points!';
    bonusElement.style.left = `${Math.random() * 80}%`;
    bonusElement.style.top = `${Math.random() * 80}%`;
    document.getElementById('timed-bonus-container').appendChild(bonusElement);

    bonusElement.addEventListener('click', function() {
        if (selectedBonus === 'golden-click') {
            multiplier *= 2;
            bonusSound.play();
        } else {
            score += 500;
            updateScore();
            bonusSound.play();
        }
        document.getElementById('timed-bonus-container').removeChild(bonusElement);
    });

    setTimeout(() => {
        if (document.getElementById('timed-bonus-container').contains(bonusElement)) {
            document.getElementById('timed-bonus-container').removeChild(bonusElement);
        }
    }, 10000); // Bonus disappears after 10 seconds
}

// Handle daily reward
document.getElementById('claim-daily-reward').addEventListener('click', function() {
    const today = new Date().toDateString();
    if (localStorage.getItem('lastClaimedDailyReward') !== today) {
        gems += 10;
        updateGems();
        localStorage.setItem('lastClaimedDailyReward', today);
        document.getElementById('daily-reward-message').innerText = `You claimed 10 gems today!`;
    } else {
        document.getElementById('daily-reward-message').innerText = `You have already claimed your reward today!`;
    }
});

// Function to initialize the game
window.onload = function() {
    updateScore();
    updateGems();
    updateClickPower();
    updatePrices();
    updateUpgrades();
    updateLeaderboard();
    generateDailyQuests();
    setInterval(spawnTimedBonus, 30000); // Spawn a timed bonus every 30 seconds
    setInterval(checkDailyQuests, 5000); // Check quests every 5 seconds
};
// Prevent zoom on double-tap in mobile
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
