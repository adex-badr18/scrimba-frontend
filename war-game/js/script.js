const cardsContainer = document.getElementById('cards-container');
const getDeckBtn = document.getElementById('get-deck-btn');
const drawCardsBtn = document.getElementById('draw-cards-btn');
const cardsCount = document.getElementById('cards-count');
const scoresBtn = document.getElementById('scores-btn');
const scoresModal = document.getElementById('scores-modal');
const computerScore = document.getElementById('computer-score');
const userScore = document.getElementById('user-score');
const closeModalBtn = document.getElementById('close-modal-btn');
let deckId;
const scores = {
    computer: 0,
    user: 0
};

window.onload = () => {
    drawCardsBtn.disabled = true;
}

async function getDeck() {
    drawCardsBtn.disabled = false;

    const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/');
    const data = await res.json();

    deckId = data.deck_id;
    cardsCount.textContent = `(${data.remaining} Cards)`;
}

async function drawCards() {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`);
    const data = await res.json();

    getDeckBtn.disabled = true;

    cardsCount.textContent = `(${data.remaining} Cards)`;
    if (!data.remaining) {
        drawCardsBtn.disabled = true;
        getDeckBtn.disabled = false;
        showScores(data.remaining);
        return;
    }
    const [card1, card2] = data.cards;

    renderCards(data);
    showResultModal(card1, card2);

    setTimeout(() => {
        document.getElementById('in-game-result-modal').remove();
    }, 100);
}

function renderCards(cardsObj) {
    cardsContainer.innerHTML = '';

    cardsObj.cards.forEach(card => {
        const cardImage = document.createElement('img');
        const cardContainer = document.createElement('div');

        cardContainer.className = 'card';

        cardImage.src = card.image;
        cardImage.className = 'card-img';

        cardContainer.append(cardImage);

        cardsContainer.append(cardContainer);
    })
}

function IdentifyWinningCard(card1, card2) {
    const cardValuesArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
    const card1ValueIndex = cardValuesArray.indexOf(card1.value);
    const card2ValueIndex = cardValuesArray.indexOf(card2.value);

    if (card1ValueIndex > card2ValueIndex) {
        scores.computer++;
        return `Computer wins!`;
    } else if (card1ValueIndex < card2ValueIndex) {
        scores.user++;
        return `You win!`;
    } else {
        return `War!`;
    }
}

function showResultModal(card1, card2) {
    const modal = document.createElement('div');
    modal.className = 'in-game-result-modal';
    modal.id = 'in-game-result-modal';

    modal.innerHTML = `
        <h2 class="in-game-result">${IdentifyWinningCard(card1, card2)}</h2>
    `;

    document.getElementById('app-content').append(modal);
    console.log(scores);
}

function showScores(cardCount) {
    computerScore.textContent = `Computer: ${scores.computer} point(s)`;
    userScore.textContent = `User: ${scores.user} point(s)`;

    if (cardCount === 0) {
        const winnerText = document.querySelector('.scores-modal-content h3');
        winnerText.style.marginBottom = '0.75em';
        winnerText.style.fontSize = '1rem';
        if (scores.computer > scores.user) {
            winnerText.textContent = 'The computer won the game!!!';
        } else if (scores.computer < scores.user) {
            winnerText.textContent = 'You won the game!!!';
        } else {
            winnerText.textContent = 'It\'s a tie! Try again';
        }
    }

    scoresModal.style.display = 'flex';
}

function closeModal() {
    scoresModal.style.display = 'none';
}

getDeckBtn.addEventListener('click', getDeck);
drawCardsBtn.addEventListener('click', drawCards);
closeModalBtn.addEventListener('click', closeModal);
scoresBtn.addEventListener('click', () => {
    if (scores.computer > 0 || scores.user > 0) {
        showScores();
    }
});

