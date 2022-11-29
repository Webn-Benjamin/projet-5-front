//Initialisation du local storage
let productLocalstorage = JSON.parse(localStorage.getItem("product"));
// Selection de la section des produits
const emptyCart = document.querySelector("#cart__items");
// Affichage des produits
const displayProducts = () => {
  // Si le localstorage est vide
  if (productLocalstorage === null || productLocalstorage === 0) {
    const displayEmptyCart = `<p>Votre panier est vide</p>`;
    emptyCart.innerHTML = displayEmptyCart;
  } else {
    for (let i = 0; i < productLocalstorage.length; i++) {
      // Récupération du prix via l'api
      fetch("http://localhost:3000/api/products/" + productLocalstorage[i].id)
        .then((response) => response.json())
        .then((product) => {
          displayarticle = createTemplate(product, productLocalstorage[i]);
          displayprice = totalPrix(product, productLocalstorage[i]);
          document
            .querySelector("#cart__items")
            .insertAdjacentHTML("beforeEnd", displayarticle);
            document.querySelector("#totalPrice").textContent = displayprice
        });
    }
  }
};
displayProducts();
// Template pour afficher les produits
createTemplate = (product, productLocalstorage) => {
  return `<article class="cart__item" data-id="" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${productLocalstorage.colors}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalstorage.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
};

totalQtéProduits = () => {
  let InitialValue = 0;
  for (let q in productLocalstorage) {
    // La fonction parseInt() permet de convertir une chaîne en nombre entier.
    const qté = parseInt(productLocalstorage[q].quantity);

    // Donner la valeur parseInt à la valeur initiale.
    InitialValue += qté;
  }
  // Selectionner la quantité puis l'injecter
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = InitialValue;
};
totalQtéProduits();

totalPrix = (product, productLocalstorage) => {
  let totalPrice = 0;
  const price = product.price * productLocalstorage.quantity;
  const calcPrice = parseInt(price);
  // Donner la valeur parseInt à la valeur initiale.
  totalPrice += calcPrice;
  return totalPrice;
};
