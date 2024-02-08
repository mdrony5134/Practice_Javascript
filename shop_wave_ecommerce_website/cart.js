const tbodyEle = document.querySelector("#tbody");

let cartItemObj;

function loadCartItem() {
  cartItemObj = bagItem.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
    return null;
  });
}
loadCartItem();

function displayCartItem() {
  let innerHtml = "";
  cartItemObj.forEach((item) => {
    innerHtml += `
    <tr>
      <td><i class="far fa-times-circle" onclick="removeItem(${item.id})"></i></td>
      <td><img src="${item.image}" alt="product img"></td>
      <td>${item.item_name}</td>
      <td>${item.original_price}</td>
      <td><input type="number" value="1" min="1" onclick="updateSubtotal(this, ${item.original_price})"></td>
      <td>${item.original_price}</td>
    </tr> 
    `;
  });
  tbodyEle.innerHTML = innerHtml;
}
displayCartItem();

function updateSubtotal(input, price) {
  const quantity = parseInt(input.value);
  if (quantity > 0) {
    const subtotal = quantity * price;
    input.parentElement.nextElementSibling.textContent = subtotal;
  } else {
    input.value = 1;
    input.parentElement.nextElementSibling.textContent = price;
  }
}
function removeItem(id){
  bagItem = bagItem.filter(itemId => itemId != id)
  localStorage.setItem("bagItem", JSON.stringify(bagItem));
  loadCartItem();
  displayCartItem();
  displayCartCount();
}

 