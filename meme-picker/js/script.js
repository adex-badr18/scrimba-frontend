import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");

function getEmotionsArray(cats) {
    let catsArray = [];

    cats.forEach((cat) => {
        for (const emotion of cat.emotionTags) {
            catsArray.push(emotion);
        }
    });

    return catsArray;
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