import { menuArray } from "./data.js";

let menuData = menuArray;
let orderArray = [];
let amount = 0;
const ordersContainer = document.getElementById('orders');

document.addEventListener('click', e => {
    if (e.target.dataset.add) {
        ordersContainer.style.display = 'block';
        addOrder(e.target.dataset.add);
    } else if (e.target.dataset.removeOrder) {
        removeOrder(e.target.dataset.removeOrder);
    }
});

function removeOrder(orderId) {
    orderArray = orderArray.filter(order => {
        return order.id != orderId;
    });
    
    renderOrder();

    if (!orderArray) {
        ordersContainer.style.display = 'none';
    }
}

function addOrder(menuId) {
    let orderHtml = '';
    const targetMenuObj = menuData.filter(menu => {
        return menu.id === Number(menuId);
    })[0];

    if (!orderArray.includes(targetMenuObj)) {
        orderArray.push(targetMenuObj);
        
        renderOrder();
    }
}

function renderOrder() {
    let orderHtml = '';
    amount = 0;
    orderArray.forEach(order => {
        orderHtml += `
            <div class="order-item">
                <h3>${order.name}</h3>
                <span data-remove-order="${order.id}">remove</span>
                <h4>$${order.price}</h4>
            </div>
        `;
        amount += order.price
    })

    document.getElementById('order-list').innerHTML = orderHtml;
    document.getElementById('total-amount').textContent = `$${amount}`;
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