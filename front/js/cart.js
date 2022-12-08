// récupération du localStorage
let localstorage = JSON.parse(localStorage.getItem("product"));
// initialisation des fonctions
// Récupération des prix des produits de l'Api
function getProductapi() {
  for (let p = 0; p < localstorage.length; p++) {
    fetch("http://localhost:3000/api/products/" + localstorage[p].id)
      .then((response) => response.json())
      .then((data) => {
        displayProduct(data, localstorage[p]);
        productTemplate(data, localstorage[p]);
        totalPrix(data, localstorage[p]);
        modifyQtt(data, localstorage[p]);
      });
  }
}
getProductapi();

// Selection de la section des produits
let emptyCart = document.querySelector("#cart__items");

function displayProduct(priceApi, productcart) {
  if (localstorage === null) {
    let createpEmpty = document.createElement("p");
    createpEmpty.textContent = "Votre panier est vide";
    emptyCart.appendChild(createpEmpty);
  } else {
    displayTemplate = productTemplate(priceApi, productcart);
    displayPrice = emptyCart.insertAdjacentHTML("beforeend", displayTemplate);
  }
}

function productTemplate(price, productcart) {
  let display = "";
  display += `
    <article class="cart__item" data-id="${productcart.id}" data-color="${productcart.colors}">
    <div class="cart__item__img">
    <img src="${productcart.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${productcart.name}</h2>
    <p>${productcart.colors}</p>
    <p>${price.price} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productcart.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>
    `;
  return display;
}

function totalQteProduits() {
  let InitialValue = 0;
  let productLocalstorage = localstorage;
  for (let q in productLocalstorage) {
    // La fonction parseInt() permet de convertir une chaîne en nombre entier.
    const qte = parseInt(productLocalstorage[q].quantity);

    // Donner la valeur parseInt à la valeur initiale.
    InitialValue += qte;
  }
  // Selectionner la quantité puis l'injecter
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = InitialValue;
}
totalQteProduits();

function totalPrix(product, productLocalstorage) {
  let initialPrice = 0;
  for (let q in localstorage) {
    let price = parseInt(product.price * productLocalstorage.quantity);
    initialPrice += price;
  };
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = initialPrice;
}

function modifyQtt(price, productcart) {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      event.preventDefault();

      let quantityModif = localstorage[k].quantity;
      let qttModifValue = qttModif[k].valueAsNumber;

      const resultFind = localstorage.find(
        (el) => el.qttModifValue !== quantityModif
      );
      resultFind.quantity = qttModifValue;
      localstorage[k].quantity = resultFind.quantity;
      localStorage.setItem("product", JSON.stringify(localstorage));

      // refresh rapide
      totalPrix(price, productcart);
      totalQteProduits();
      // location.reload();
    });
  }
}
