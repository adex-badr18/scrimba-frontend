let cards = [] // array - ordered list of items
let sum = 0; // Create a variable, sum, and set it to the sum of the two cards
let hasBlackJack = false;
let isAlive = false // Create a variable called isAlive and assign it to true
let message = "" // Declare a variable called message and assign its value to an empty string

// Store the message-el paragraph in a variable called messageEl
let messageEl = document.getElementById("message-el");

// Store the sum paragraph in a variable called sumEl
let sumEl = document.getElementById("sum-el");

// Store the cards paragraph in a variable called cardsEl
let cardsEl = document.getElementById("cards-el");


// Create a function that returns a random number between 1 and 13
function getRandomCard() {
    // if 1     -> return 11
    // if 11-13 -> return 10
    let randomNumer = Math.floor(Math.random() * 13) + 1
    if (randomNumer > 10) {
        return 10
    } else if (randomNumer === 1) {
        return 11
    } else {
        return randomNumer
    }
}

// Create a new function called startGame() that calls renderGame()
function startGame() {
    isAlive = true // Create a variable called isAlive and assign it to true
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard] // array - ordered list of items
    sum = firstCard + secondCard; // Create a variable, sum, and set it to the sum of the two cards

    renderGame()
}

// Write the conditional according to these rules:
// if less than or equal to 20 -> "Do you want to draw a new card? 🙂"
// else if exactly 21 -> "Wohoo! You've got Blackjack! 🥳"
// else -> "You're out of the game! 😭"

function renderGame() {
    cardsEl.textContent = "Cards: "

    // Create a for loop that renders out all the cards instead of just two
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

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

// Create a function newCard() that allows player to pick a new card
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        // Create a card variable, and hard code its value to a number (2-11)
        let card = getRandomCard();
        // Add the new card to the sum variable
        sum += card;

        // Push the card to the cards array
        cards.push(card)

        // Call renderGame()
        renderGame();
    }
}