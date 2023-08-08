import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

getImageBtn.addEventListener('click', renderCat);

emotionRadios.addEventListener('change', highlightCheckedOption);

memeModalCloseBtn.addEventListener('click', closeModal);

function closeModal() {
    memeModal.style.display = 'none';
}

function getMatchingCatsArray() {
    const selectedRadio = document.querySelector('input[type="radio"]:checked');
    const isGif = gifsOnlyOption.checked;
    let selectedEmotion = "";

    if (selectedRadio) {
        selectedEmotion = selectedRadio.value;

        const matchingCatsArray = catsData.filter(cat => {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
            }

            return cat.emotionTags.includes(selectedEmotion);
        });

        return matchingCatsArray;
    }
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();

    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomNumber];
    }
}

function renderCat() {
    const catObject = getSingleCatObject();

    memeModalInner.innerHTML = `
        <img class="cat-img" src="./images/${catObject.image}" alt="${catObject.alt}">
    `;

    memeModal.style.display = 'flex';
}

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio');

    for (const radio of radios) {
        radio.classList.remove('highlight');
    }

    document.getElementById(e.target.id).parentElement.classList.add('highlight');
}

function getEmotionsArray(cats) {
    let emotionsArray = [];

    cats.forEach((cat) => {
        for (const emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            }
        }
    });
    return emotionsArray;
}

function renderEmotionsRadios(cats) {
    let radioItems = ``;
    const emotions = getEmotionsArray(cats)

    emotions.forEach(emotion => {
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input type="radio" id="${emotion}" value="${emotion}" name="choice-radios">
            </div>
        `;
    });

    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData)