let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el")

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = '';

    // myLeads = JSON.stringify(myLeads);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    renderLeads();
});


function renderLeads() {
    // myLeads = localStorage.getItem("myLeads");
    // myLeads = JSON.parse(myLeads);

    let listItems = '';
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
            <li>
                <a href="${myLeads[i]}" target="_blank">
                    ${myLeads[i]}
                </a>
            </li>
        `;

        // const li = document.createElement("li");
        // li.textContent = myLeads[i];
        // ulEl.append(li);
    }

    ulEl.innerHTML = listItems;
}