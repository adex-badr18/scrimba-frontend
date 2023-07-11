// 1. Create two variables, firstCard and secondCard. Set their values to a random number between 2-11
let firstCard = 10; 
let secondCard = 11;
let sum = firstCard + secondCard; // Create a variable, sum, and set it to the sum of the two cards
let hasBlackJack = false;
let isAlive = true // Create a variable called isAlive and assign it to true
let message = "" // Declare a variable called message and assign its value to an empty string

// Store the message-el paragraph in a variable called messageEl
let messageEl = document.getElementById("message-el");

// Store the sum paragraph in a variable called sumEl
let sumEl = document.getElementById("sum-el");

// Store the cards paragraph in a variable called cardsEl
let cardsEl = document.getElementById("cards-el");


// Write the conditional according to these rules:

// if less than or equal to 20 -> "Do you want to draw a new card? 🙂"
// else if exactly 21 -> "Wohoo! You've got Blackjack! 🥳"
// else -> "You're out of the game! 😭"

function startGame() {
    // Render the cards on the page using this format -> "Cards: 10 4"
    cardsEl.textContent = "Cards: " + firstCard + " " + secondCard

    // Render the sum on the page using this format -> "Sum: 14"
    sumEl.textContent = "Sum: " + sum;

    if (sum <= 20) {
        // Reassign the message variable to the string we're logging out
        message = "Do you want to draw a new card? 🙂"; 
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! 🥳";
        hasBlackJack = true;
    } else {
        message = "You're out of the game! 😭";
        isAlive = false; // Flip isAlive value to false in the appropriate code block
    }
    // Display the message in the messageEl using messageEl.textContent
    messageEl.textContent = message;
}

// Create a function newCard() that logs out "Drawing a new card from the deck!"
function newCard() {
    console.log("Drawing a new card from the deck!");
}