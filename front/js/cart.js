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
    let displayarticle = "";

    for (i = 0; i < productLocalstorage.length; i++) {
      // Récupération du prix via l'api
      fetch("http://localhost:3000/api/products/" + productLocalstorage[i].id)
        .then((response) => response.json())
        .then((product) => {
          displayarticle = createTemplate(product, productLocalstorage.quantity);
          document
            .querySelector("#cart__items")
            .insertAdjacentHTML("beforeEnd", displayarticle);
        });
    }
  }
};

createTemplate = (product, quantity) => {
  console.log(quantity)
  const productTemplate = `<article class="cart__item" data-id="" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.colors}</p>
                    <p>${product.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  return productTemplate;
};
// Initialisation des fonctions
displayProducts();
