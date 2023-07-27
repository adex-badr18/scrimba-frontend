import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-dd256-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, "endorsementList");

const textareaEl = document.getElementById("endorsement-textarea");
const publishButton = document.getElementById("publish-btn");
const endorsementChatListEl = document.getElementById("endorsement-list-el");
const endorsementInfoEl = document.getElementById('endorsement-info');
const fromEl = document.getElementById("from-el");
const toEl = document.getElementById("to-el");

publishButton.addEventListener("click", () => {
    if (textareaEl.value !== "" && fromEl.value !== "" && toEl.value !== "") {

        let endorsement = {
            to: toEl.value,
            from: fromEl.value,
            body: textareaEl.value,
            likesCount: 0,
            isLiked: false
        };

        push(endorsementListInDB, endorsement);
        clearInputFields();
    } else {
        showErrorMessage();

        setTimeout(removeErrorMessageEl, 5000);
    }
})

onValue(endorsementListInDB, (snapshot) => {
    if (snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val());

        clearEndorsementChatList();

        endorsementArray.forEach((currentEndorsement) => {
            // currentEndorsement = currentEndorsement[1]
            appendEndorsementToChatList(currentEndorsement);
        })
    } else {
        endorsementChatListEl.innerHTML = `No endorsements posted yet`
    }
})

function showErrorMessage() {
    createErrorMessageElement();
}

function createErrorMessageElement() {
    let errorMessageElement = document.createElement('span');
    errorMessageElement.id = 'error-message-el';
    errorMessageElement.textContent = 'All fields are required';

    endorsementInfoEl.parentNode.insertBefore(errorMessageElement, endorsementInfoEl.nextSibling);
}

function removeErrorMessageEl() {
    const errorMessageEl = document.getElementById("error-message-el");
    errorMessageEl.remove();

}

function clearInputFields() {
    textareaEl.value = "";
    toEl.value = "";
    fromEl.value = "";
}

function clearEndorsementChatList() {
    endorsementChatListEl.innerHTML = '';
}

function appendEndorsementToChatList(endorsementArr) {
    let isLiked = false;
    let endorsementID = endorsementArr[0];
    let endorsementObj = endorsementArr[1];
    let likes = endorsementObj.likesCount;
    const endorsementEl = document.createElement("div");
    const endorsementToEl = document.createElement("h4");
    const endorsementFromEl = document.createElement("p");
    const endorsementTextEl = document.createElement("p");
    const endorsementFooterEl = document.createElement("div");
    const endorsementLikeEl = document.createElement("div");
    const endorsementLikeIcon = document.createElement("i");
    const endorsementLikesCountEl = document.createElement("span");

    endorsementEl.className = "posted-endorsement-el";
    endorsementToEl.className = "endorsement-endpoints";
    endorsementFromEl.className = "endorsement-endpoints";
    endorsementTextEl.className = "endorsement-text";
    endorsementFooterEl.className = "endorsement-footer";
    endorsementLikeEl.className = "like-el";
    endorsementLikeIcon.className = "fa-regular fa-heart like-icon";
    endorsementLikesCountEl.className = "likes-count";

    endorsementLikeIcon.addEventListener("click", () => {
        let endorsementLocationInDB = ref(database, `endorsementList/${endorsementID}`);

        if (!endorsementObj.isLiked) {
            endorsementLikeIcon.className = "fa-solid fa-heart like-icon";
            likes += 1;
            isLiked = true;
            updateLikesCountInDB(endorsementLocationInDB, endorsementObj, likes, isLiked);
        } else {
            endorsementLikeIcon.className = "fa-regular fa-heart like-icon";
            likes -= 1;
            isLiked = false;
            updateLikesCountInDB(endorsementLocationInDB, endorsementObj, likes, isLiked);
        }

        // if (endorsementLikeIcon.classList.contains("fa-regular")) {
        //     likes += 1;
        //     updateLikesCountInDB(endorsementLocationInDB, endorsementObj, likes);
        //     endorsementLikeIcon.className = "fa-solid fa-heart like-icon";
        // } else if (endorsementLikeIcon.classList.contains("fa-solid")) {
        //     endorsementLikeIcon.className = "fa-regular fa-heart like-icon";
        //     likes -= 1;
        //     updateLikesCountInDB(endorsementLocationInDB, endorsementObj, likes);
        // }

        // let endorsementLocationInDB = ref(database, `endorsementList/${endorsementID}`);
        // endorsementObj.likesCount = likes;
        // update(endorsementLocation, { likesCount: likes });
    });

    endorsementToEl.textContent = `To ${endorsementObj.to}`;
    endorsementFromEl.textContent = `From ${endorsementObj.from}`;
    endorsementTextEl.textContent = `${endorsementObj.body}`;
    endorsementLikesCountEl.textContent = `${endorsementObj.likesCount}`;

    endorsementLikeEl.append(endorsementLikeIcon, endorsementLikesCountEl);
    endorsementFooterEl.append(endorsementFromEl, endorsementLikeEl);
    endorsementEl.append(endorsementToEl, endorsementTextEl, endorsementFooterEl);
    endorsementChatListEl.prepend(endorsementEl);
}

function updateLikesCountInDB(endorsementLocation, obj, likes, isLiked) {
    obj.likesCount = likes;
    update(endorsementLocation, { likesCount: likes, isLiked: isLiked });
}