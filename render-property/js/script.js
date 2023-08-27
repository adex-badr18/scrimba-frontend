import placeholderPropertyObj from "../properties/placeholderPropertyObj.js";
import propertyForSaleArr from "../properties/propertyForSaleArr.js";

function getPropertyHtml(propertyArr = [placeholderPropertyObj]) {
    return propertyArr.map(property => {
        const { 
            propertyLocation,
            priceGBP,
            roomsM2,
            comment,
            image
         } = property;

         const totalArea = roomsM2.reduce((total, roomSize) => total + roomSize);

         return `
            <section class="card">
                <img src="../images/${image}">
                <div class="card-right">
                    <h2>${propertyLocation}</h2>
                    <h3>${priceGBP}</h3>
                    <p>${comment}</p>
                    <h3>${totalArea} m&sup2;</h3>
                </div>
            </section>
         `;
    }).join(' ');
}

document.getElementById('container').innerHTML = getPropertyHtml(propertyForSaleArr);