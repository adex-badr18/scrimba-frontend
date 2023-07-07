let homeScore = document.getElementById("home-score");
let guestScore = document.getElementById("guest-score");
let homeCount = 0;
let guestCount = 0;

function add1PointHome() {
    homeCount += 1;
    homeScore.textContent = homeCount;
}

function add2PointsHome() {
    homeCount += 2;
    homeScore.textContent = homeCount;
}

function add3PointsHome() {
    homeCount += 3;
    homeScore.textContent = homeCount;
}

// Guest score functions
function add1PointGuest() {
    guestCount += 1;
    guestScore.textContent = guestCount;
}

function add2PointsGuest() {
    guestCount += 2;
    guestScore.textContent = guestCount;
}

function add3PointsGuest() {
    guestCount += 3;
    guestScore.textContent = guestCount;
}

function markHigherScore() {
    
}