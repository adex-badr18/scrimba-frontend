const cardsContainer = document.getElementById('cards-container');
const drawCardsBtn = document.getElementById('draw-cards-btn');
let deckId;

function getDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;
        });
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            const [card1, card2] = data.cards;

            renderCards(data);
            showResultModal(card1, card2);

            setTimeout(() => {
                document.getElementById('in-game-result-modal').remove();
            }, 5000);
        });
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
        return `Computer wins!`;
    } else if (card1ValueIndex < card2ValueIndex) {
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
}

document.getElementById('get-deck-btn').addEventListener('click', getDeck);
document.getElementById('draw-cards-btn').addEventListener('click', drawCards);