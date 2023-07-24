import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
        let endorsement = textareaEl.value;

        push(endorsementListInDB, endorsement);
        clearTextarea();
    } else {
        showErrorMessage();
        
        setTimeout(removeErrorMessageEl, 5000);
    }
})

onValue(endorsementListInDB, (snapshot) => {
    if (snapshot.exists()) {
        let endorsementArray = Object.values(snapshot.val());

        // clearEndorsementChatList();

        endorsementArray.forEach((currentEndorsement) => {
            // appendEndorsementToChatList(currentEndorsement);
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
    errorMessageElement.textContent = 'Write endorsement in the text field above 👆';

    endorsementInfoEl.parentNode.insertBefore(errorMessageElement, endorsementInfoEl.nextSibling);
}

function removeErrorMessageEl() {
    const errorMessageEl = document.getElementById("error-message-el");
    errorMessageEl.remove();
    
}

function clearTextarea() {
    textareaEl.value = "";
}

function clearEndorsementChatList() {
    endorsementChatListEl.innerHTML = '';
}

function appendEndorsementToChatList(endorsementObj) {
    const endorsementEl = document.createElement("div");
    const endorsementToEl = document.createElement("h4");
    const endorsementFromEl = document.createElement("p");
    const endorsementTextEl = document.createElement("p");
    const endorsementFooterEl = document.createElement("div");
    const endorsementLikeEl = document.createElement("div");
    const endorsementLikeIcon = document.createElement("span");
    const endorsementLikesCountEl = document.createElement("span");

    endorsementEl.className = "posted-endorsement-el";
    endorsementToEl.className = "endorsement-endpoints";
    endorsementFromEl.className = "endorsement-endpoints";
    endorsementTextEl.className = "endorsement-text";
    endorsementFooterEl.className = "endorsement-footer";
    endorsementLikeEl.className = "like-el";
    endorsementLikeIcon.className = "material-symbols-outlined";
    endorsementLikesCountEl.className = "likes-count";

    endorsementToEl.textContent = `To ${endorsementObj.to}`;
    endorsementFromEl.textContent = `From ${endorsementObj.from}`;
    endorsementTextEl.textContent = `${endorsementObj.body}`;
    endorsementLikeIcon.textContent = 'favorite';
    endorsementLikesCountEl.textContent = `${endorsementObj.likesCount}`;

    endorsementLikeEl.append(endorsementLikeIcon, endorsementLikesCountEl);
    endorsementFooterEl.append(endorsementFromEl, endorsementLikeEl);
    endorsementEl.append(endorsementToEl, endorsementTextEl, endorsementFooterEl);
    endorsementChatListEl.prepend(endorsementEl);
}