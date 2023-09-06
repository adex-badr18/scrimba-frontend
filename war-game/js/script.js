let deckId;

function getDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            deckId = data.deck_id;
        });
}

document.getElementById('get-deck').addEventListener('click', getDeck);