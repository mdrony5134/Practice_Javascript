const bagItemEle = document.querySelector(".bag-items-container");
const bagSummary = document.querySelector(".bag-summary");
let productItemObj;

function onloadBag(){
loadItemObj();
displayBagItem();
displayBagSummary();
}

function loadItemObj(){
  productItemObj = productItem.map(itemId =>{
    for (let i = 0; i < items.length; i++) {
       if(itemId == items[i].id){
        return items[i]
       }
    }
  })
  // console.log(productItemObj)
}

function displayBagItem(){
let innerHtml = "";
  productItemObj.forEach(item => {
    innerHtml += generateHtml(item)
  });
  bagItemEle.innerHTML = innerHtml;
}

function removeBagItem(id){
  productItem = productItem.filter(bagItemId => bagItemId != id);
  localStorage.setItem("productItem", JSON.stringify(productItem))
  // console.log(productItem)
  loadItemObj();
  displayBagItem();
  updateBagItem();
  displayBagSummary();
}

function generateHtml(item){
  return ` <div class="bag-item-container">
  <div class="item-left-part">
    <img class="bag-item-img" src="../${item.image}" />
  </div>
  <div class="item-right-part">
    <div class="company">${item.company}</div>
    <div class="item-name">
      ${item.item_name}
    </div>
    <div class="price-container">
      <span class="current-price">TK ${item.current_price}</span>
      <span class="original-price">TK ${item.original_price}</span>
      <span class="discount-percentage">(${item.discount_percentage} % OFF)</span>
    </div>
    <div class="return-period">
      <span class="return-period-days">${item.return_period} days</span> return available
    </div>
    <div class="delivery-details">
      Delivery by
      <span class="delivery-details-days">${item.delivery_date}</span>
    </div>
  </div>

  <div class="remove-from-cart" onclick="removeBagItem(${item.id})">X</div>
</div>`
}

onloadBag();

// bag summary

function displayBagSummary(){
  let totalItem = productItemObj.length;
  let totalMRP = 0;
  let discountMRP = 0;
  productItemObj.forEach(item => {
    totalMRP += item.original_price;
    discountMRP += item.original_price - item.current_price;
  })
  let convenienceFee = 99;
  let totalAmount = totalMRP - discountMRP + convenienceFee;
  bagSummary.innerHTML = `
    <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem}) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">${totalMRP} TK</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-${discountMRP} TK</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">${convenienceFee} TK</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">${totalAmount} TK</span>
    </div>
  </div>
  <button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
  </button>
`
}

