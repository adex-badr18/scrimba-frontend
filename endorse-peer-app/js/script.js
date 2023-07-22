const textareaEl = document.getElementById("endorsement-text");
const publishButton = document.getElementById("publish-btn");
const errorMessageEl = document.getElementById("error-message-el");

publishButton.addEventListener("click", () => {
    if (textareaEl.value !== "") {
        console.log("Not empty");
    } else {
        showErrorMessage();
    }
})

function showErrorMessage() {
    errorMessageEl.textContent = "Endorsement field should not be empty";
}