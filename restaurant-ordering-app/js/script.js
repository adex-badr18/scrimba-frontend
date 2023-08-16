import { menuArray } from "./data.js";

let menuData = menuArray;

function getMenuHtml() {
    let menuHtml = '';

    menuData.forEach(menu => {
        const ingredients = menu.ingredients.join(', ');
        menuHtml += `
            <div class="menu-item">
                <div class="menu-image">${menu.emoji}</div>
                <div class="menu-details">
                    <h3>${menu.name}</h3>
                    <p>${ingredients}</p>
                    <h4>$${menu.price}</h4>
                </div>
                <div class="icon-wrapper">
                    <i class="fa-regular fa-plus add-icon" id="icon-${menu.id}" data-add="${menu.id}"></i>
                </div>
            </div>
        `;
    });

    return menuHtml;
}

function render() {
    document.getElementById('menu-list').innerHTML = getMenuHtml();
}

render();