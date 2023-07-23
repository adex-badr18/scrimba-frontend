const textareaEl = document.getElementById("endorsement-text");
const publishButton = document.getElementById("publish-btn");
const errorMessageEl = document.getElementById("error-message-el");

publishButton.addEventListener("click", () => {
    if (textareaEl.value !== "") {
        console.log("Not empty");
    } else {
        showErrorMessage();
        setTimeout(clearErrorMessage, 5000);
    }
})

function showErrorMessage() {
    errorMessageEl.textContent = "Write endorsement in the text field above 👆";
}

function clearErrorMessage() {
    errorMessageEl.textContent = "";
}