const cardsContainer = document.getElementById('cards-container');
let deckId;

function getDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            deckId = data.deck_id;
        });
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            const [card1, card2] = data.cards;
            // console.log(card1);
            // console.log(card2);
            // console.log(data);
            renderCards(data);

            // setTimeout(showResultModal(card1, card2), 3000);
            IdentifyWinningCard(card1, card2);
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
        return `Card1(${card1.value}) is greater than Card2(${card2.value}), Computer wins!`;
    } else if (card1ValueIndex < card2ValueIndex) {
        return `Card2(${card2.value}) is greater than Card1(${card1.value}), You win!`;
    } else {
        return `Card1(${card1.value}) is equal to Card2(${card2.value}), War!`;
    }
}



document.getElementById('get-deck-btn').addEventListener('click', getDeck);
document.getElementById('draw-cards-btn').addEventListener('click', drawCards);