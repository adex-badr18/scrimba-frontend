const cardsContainer = document.getElementById('cards-container');
let deckId;

function getDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            deckId = data.deck_id;
        });
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            renderCards(data);
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

document.getElementById('get-deck-btn').addEventListener('click', getDeck);
document.getElementById('draw-cards-btn').addEventListener('click', drawCards);