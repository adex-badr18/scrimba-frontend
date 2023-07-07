let homeScore = document.getElementById("home-score");
let guestScore = document.getElementById("guest-score");
let homeCount = 0;
let guestCount = 0;

function add1PointHome() {
    homeCount += 1;
    homeScore.textContent = homeCount;
}