import placeholderPropertyObj from "../properties/placeholderPropertyObj";
import propertyForSaleArr from "../properties/propertyForSaleArr";

function getPropertyHtml(propertyArr = [placeholderPropertyObj]) {
    return propertyArr.map(property => {
        const { 
            propertyLocation,
            priceGBP,
            roomsM2,
            comment,
            image
         } = property;
    })
}