//Initialisation du local storage
let productLocalstorage = JSON.parse(localStorage.getItem("product"));
// console.table(productLocalstorage);
const emptyCart = document.querySelector("#cart__items");

const displayProducts = () => {
  if (productLocalstorage === null || productLocalstorage === 0) {
    const displayEmptyCart = `<p>Votre panier est vide</p>`;
    emptyCart.innerHTML = displayEmptyCart;
  } else {
    let displayarticle = "";
    for (i = 0; i < productLocalstorage.length; i++) {
      fetch("http://localhost:3000/api/products/" + productLocalstorage[i].id)
        .then((response) => response.json())
        .then((data) => {
           const retrieveprice = document.querySelector(".cart__item__content__description")
           const quantity = document.querySelector(".itemQuantity")
           retrieveprice.insertAdjacentHTML("beforeEnd", data.price * quantity.value + " €");
        });

      displayarticle += `
             <article class="cart__item" data-id="" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${productLocalstorage[i].imageUrl}" alt="${productLocalstorage[i].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productLocalstorage[i].name}</h2>
                    <p>${productLocalstorage[i].colors}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalstorage[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `;
    }
    document.querySelector("#cart__items").innerHTML = displayarticle;
  }
};
displayProducts();
