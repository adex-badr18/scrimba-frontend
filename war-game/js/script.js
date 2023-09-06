function getDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json)
        .then(data => {
            console.log(data);
        });
}

document.getElementById('get-deck').addEventListener('click', getDeck);