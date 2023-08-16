import { menuArray } from "./data.js";

let menuData = menuArray;
let orderArray = [];

document.addEventListener('click', e => {
    if (e.target.dataset.add) {
        addMenu(e.target.dataset.add);
    } 
    // else if (e.target.dataset.increaseQty) {
    //     incrementQty(e.target.dataset.increaseQty);
    // } else if (e.target.dataset.decreaseQty) {
    //     incrementQty(e.target.dataset.decreaseQty);
    // }
});

function addMenu(menuId) {
    let orderHtml = '';
    const targetMenuObj = menuData.filter(menu => {
        return menu.id === Number(menuId);
    })[0];

    if (!orderArray.includes(targetMenuObj)) {
        targetMenuObj.qty = 1;
        orderArray.push(targetMenuObj);
        console.log(orderArray)
    } else {
        targetMenuObj.qty++;
        console.log(targetMenuObj)
    }

    orderArray.forEach(order => {
        orderHtml += `
        <div class="order-item">
            <h3>${order.name}</h3>
            <h4>$${order.price}</h4>
            <div class="order-qty">
                <i class="fa-solid fa-minus decrease-qty"></i>
                <input type="text" class="qty-input" id="qty-${order.id}" value="${order.qty}" min="1" readonly>
                <i class="fa-regular fa-plus increase-qty"></i>
            </div>
            <h4>$${order.price * order.qty}</h4>
            <i class="fa-solid fa-trash-can delete-order"></i>
        </div>
    `;

    })

    document.getElementById('order-list').innerHTML = orderHtml;
}

function getOrderHtml(menuObj) {
    let orderHtml = `
        <div class="order-item">
            <h3>${menuObj.name}</h3>
            <span>remove</span>
            <h4>$${menuObj.price}</h4>
        </div>
    `;

    return orderHtml;
}

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

function render(markupFunction, elementId) {
    document.getElementById(elementId).innerHTML = markupFunction();
}

render(getMenuHtml, 'menu-list');