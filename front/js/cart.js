function getStorage() {
  const Localstorage = JSON.parse(localStorage.getItem("product"));
  return Localstorage;
}
getStorage();
// Selection de la section des produits
let emptyCart = document.querySelector("#cart__items");

function displayProduct() {
  if (getStorage() === null) {
    let createpEmpty = document.createElement("p");
    createpEmpty.textContent = "Votre panier est vide";
    emptyCart.appendChild(createpEmpty);
  } else {
    displayTemplate = productTemplate();
    emptyCart.insertAdjacentHTML("beforeend", displayTemplate);
  }
}
displayProduct();

function productTemplate(price) {
  let productPrice = price
  console.log(productPrice)
  let kanap = getStorage();
  let display = "";
  for (let i = 0; i < kanap.length; i++) {
    display += `
          <article class="cart__item" data-id="${kanap[i].id}" data-color="${kanap[i].colors}">
                <div class="cart__item__img">
                  <img src="${kanap[i].imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${kanap[i].name}</h2>
                    <p>${kanap[i].colors}</p>
                    <p>${productPrice}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `;
  }
  return display;
}

function getApiproduct() {
  const localstorage = getStorage();
  for (let a = 0; a < localstorage.length; a++) {
    fetch("http://localhost:3000/api/products/" + localstorage[a].id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const productprice = data.price;
        displayPrice = productTemplate(productprice);
        // const createpPrice = document.createElement("p");
        // createpPrice.textContent = productprice + " €";
        // console.log(createpPrice);
        // const selectdivprice = document.querySelector(
        //   ".cart__item__content__description"
        // );
      });
  }
}
getApiproduct();
