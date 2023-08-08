import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById('get-image-btn');

getImageBtn.addEventListener('click', getMatchingCatsArray);

function getMatchingCatsArray() {
    const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
    console.log(selectedEmotion);
}

emotionRadios.addEventListener('change', highlightCheckedOption);

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

function renderEmotionsRadios(cats){
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