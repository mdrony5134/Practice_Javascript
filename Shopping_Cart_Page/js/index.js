const itemContainerElement = document.querySelector(".items-container");
let bagItem = document.querySelector(".bag-items");


function displayProductHomepage(){
  if(!itemContainerElement){
    return;
  }
  let newHtml = "";
items.forEach(item =>{
  newHtml += `
  <div class="item-container">
    <img class="item-img" src=${item.image} alt="item image">
    <div class="rating">
      ${item.rating.stars} ⭐ | ${item.rating.count}
    </div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
      <span class="current-price">${item.current_price}</span>
      <span class="original-price">${item.original_price}</span>
      <span class="discount">(${item.discount_percentage} % off)</span>
    </div>
    <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to bag</button>
</div>
  `
})
itemContainerElement.innerHTML = newHtml;
}

displayProductHomepage();

let productItem = JSON.parse(localStorage.getItem("productItem")) || [];

function addToBag(itemId){
  productItem.push(itemId);
  localStorage.setItem("productItem", JSON.stringify(productItem))
  updateBagItem();
}

function updateBagItem(){
  if(productItem.length > 0){
  bagItem.style.visibility = "visible";
  bagItem.innerText = productItem.length;
  }else{
    bagItem.style.visibility = "hidden";
  }
}
updateBagItem();
