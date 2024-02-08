
const productContainerEle = document.querySelector(".products_container");
const newArrivalEle = document.querySelector("#new_arrival");
const cartCount = document.querySelector(".cartCount")

function displayProduct(element, category){
  if(!productContainerEle){
    return;
  }
  let innerHtml = "";
  items.filter(productItem => productItem.category === category)
       .map(item => {
    return innerHtml += ` 
    <div class="product">
    <img src="${item.image}" alt="product img" onclick="window.location.href='/sproduct.html'" >
    <div class="product_des">
      <span>${item.company}</span>
      <h5>${item.item_name}</h5>
      <div class="star">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
      </div>
      <h4>${item.original_price} TK</h4>
    </div>
    <button onclick="addToBag(${item.id})"><i class="fa fa-shopping-cart cart"></i></button>
  </div>
  `
  })
  element.innerHTML = innerHtml;
}

let bagItem = JSON.parse(localStorage.getItem("bagItem")) || [];

function addToBag(itemId){
  bagItem.push(itemId)
  displayCartCount();

  Toastify({
    text: "Item added successfully",
    className: "success",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",  
    position: "left",  
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}

function displayCartCount(){
  if(bagItem.length > 0){
    cartCount.style.visibility = "visible"
    cartCount.innerHTML = bagItem.length;
    localStorage.setItem("bagItem", JSON.stringify(bagItem));
  }else{
    cartCount.style.visibility = "hidden";
  }
}

displayCartCount();

displayProduct(productContainerEle, "feature");
displayProduct(newArrivalEle, "new-arrival");


// tostify 

