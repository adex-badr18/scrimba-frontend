const addBtn = document.getElementById("add-button");
const inputField = document.getElementById("input-field");

addBtn.addEventListener("click", () => {
    let inputValue = inputField.value;
    console.log(inputValue);
});