let homeScoreEl = document.getElementById("home-score");
let guestScoreEl = document.getElementById("guest-score");
let newGameEl = document.getElementById("new-game");
let homeScoreContainer = document.getElementById('home-score-container');
let guestScoreContainer = document.getElementById('guest-score-container');
let homeCount = 0;
let guestCount = 0;

function markHigherScore() {
    let homeScore = Number(homeScoreEl.textContent);
    let guestScore = Number(guestScoreEl.textContent);

    if (homeScore > guestScore) {
        homeScoreContainer.style.border = '3px solid #00ff00';
        guestScoreContainer.style.removeProperty('border');
    } 

    if (guestScore > homeScore) {
        guestScoreContainer.style.border = '3px solid #00ff00';
        homeScoreContainer.style.removeProperty('border');
    }
}

function add1PointHome() {
    homeCount += 1;
    homeScoreEl.textContent = homeCount;
    markHigherScore();
}

function add2PointsHome() {
    homeCount += 2;
    homeScoreEl.textContent = homeCount;
    markHigherScore();
}

function add3PointsHome() {
    homeCount += 3;
    homeScoreEl.textContent = homeCount;
    markHigherScore();
}

// Guest score functions
function add1PointGuest() {
    guestCount += 1;
    guestScoreEl.textContent = guestCount;
    markHigherScore();
}

function add2PointsGuest() {
    guestCount += 2;
    guestScoreEl.textContent = guestCount;
    markHigherScore();
}

function add3PointsGuest() {
    guestCount += 3;
    guestScoreEl.textContent = guestCount;
    markHigherScore();
}

function newGame() {
    homeCount = 0;
    guestCount = 0;
    homeScoreEl.textContent = homeCount;
    guestScoreEl.textContent = guestCount;
    homeScoreContainer.style.removeProperty('border');
    guestScoreContainer.style.removeProperty('border');
}


// EventListener
document.querySelector('button').addEventListener('click', markHigherScore());