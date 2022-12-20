// récupération du localStorage
let localstorage = JSON.parse(localStorage.getItem("product"));
// Selection de la section des produits
let emptyCart = document.querySelector("#cart__items");
// Récupération des prix des produits de l'Api
function getProductapi() {
  if (localstorage === null) {
    let createpEmpty = document.createElement("p");
    createpEmpty.textContent = "Votre panier est vide";
    emptyCart.appendChild(createpEmpty);
  } else {
    for (let p = 0; p < localstorage.length; p++) {
      fetch("http://localhost:3000/api/products/" + localstorage[p].id)
        .then((response) => response.json())
        .then((data) => {
          displayProduct(data, localstorage[p]);
          productTemplate(data, localstorage[p]);
          totalPrix(data, localstorage[p]);
          modifyQtt(data, localstorage[p]);
          delProduct(data, localstorage[p]);
        });
    }
  }
}
getProductapi();

function displayProduct(priceApi, productcart) {
  displayTemplate = productTemplate(priceApi, productcart);
  displayPrice = emptyCart.insertAdjacentHTML("beforeend", displayTemplate);
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
  }
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

      if (qttModifValue <= 0 || qttModifValue > 100) {
        alert("Veuillez choisir une quantité valide de 1 à 100");
        location.reload();
        return;
      }
      const resultFind = localstorage.find(
        (el) => el.qttModifValue !== quantityModif
      );
      resultFind.quantity = qttModifValue;
      localstorage[k].quantity = resultFind.quantity;
      localStorage.setItem("product", JSON.stringify(localstorage));
      // actualisation du prix et de la quantité
      totalPrix(price, productcart);
      totalQteProduits();
    });
  }
}

function delProduct(price, productcart) {
  let delpdt = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < delpdt.length; k++) {
    delpdt[k].addEventListener("click", (event) => {
      event.preventDefault();

      let idDelete = localstorage[k].id;
      let colorDelete = localstorage[k].colors;

      localstorage = localstorage.filter(
        (el) => el.id !== idDelete || el.colors !== colorDelete
      );
      localStorage.setItem("product", JSON.stringify(localstorage));
      delpdt[k].closest("article").remove();
      totalPrix(price, productcart);
      totalQteProduits();
      alert("produit supprimé");
    });
  }
}

//  Récupératio du bouton "passer commande"
const button = document.querySelector("#order");
// **********************************************/
// Ajout de la fonction "click" suivi de la fonction d'envoi
button.addEventListener("click", (e) => OnSubmit(e));
// **********************************************/

// Fonction d'envoi du "bouton passer la commande"
function OnSubmit(e) {
  e.preventDefault();
  if (localstorage.length === 0) {
    alert("Vous n'avez pas de produit dans le panier");
    return;
  }
  if (FormIsInvalid()) return;
  if (MailisInvalid()) return;

  const body = MakeBody();

  // Creation de la requete POST
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      const orderId = json.orderId;
      document.location.href = "confirmation.html?orderId=" + orderId;
    })
    .catch((err) => console.error(err));
}
// **********************************************/

// Test du formulaire de coordonnées si faux s'arrête
function FormIsInvalid() {
  const regex = /^[a-z,A-Z]+$/i;

  const firstname = document.querySelector("#firstName");
  if (firstname.value === "") {
    firstname.style.borderBottom = "1px solid red";
    return true;
  }
  if (regex.test(firstname.value) === false) {
    alert("merci de saisir seulement des lettres");
    return true;
  }
  const lastname = document.querySelector("#lastName");
  if (lastname.value === "") {
    lastname.style.borderBottom = "1px solid red";
    return true;
  }
  if (regex.test(lastname.value) === false) {
    alert("merci de saisir seulement des lettres");
    return true;
  }
  const adresse = document.querySelector("#address");
  if (adresse.value === "") {
    adresse.style.borderBottom = "1px solid red";
    return true;
  }
  const city = document.querySelector("#city");
  if (city.value === "") {
    city.style.borderBottom = "1px solid red";
    return true;
  }
  if (regex.test(city.value) === false) {
    alert("merci de saisir seulement des lettres");
    return true;
  }
  return false;
}

// test du mail si faux s'arrête
function MailisInvalid() {
  const email = document.querySelector("#email").value;
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regex.test(email) === false) {
    document.querySelector("#email").value = placeholder = "Email non valide";
    return true;
  }
  return false;
}
// **********************************************/

// Récupération des informations du formulaire + Création du tableau contact et de l'order ID (id produit)
function MakeBody() {
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const adress = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  const body = {
    contact: {
      firstName: firstname,
      lastName: lastname,
      address: adress,
      city: city,
      email: email,
    },
    products: GetIdsLocalStorage(),
  };
  return body;
}
// **********************************************/

// Récupération de l'order id
function GetIdsLocalStorage() {
  let idProducts = [];
  for (let i = 0; i < localstorage.length; i++) {
    idProducts.push(localstorage[i].id);
  }
  return idProducts;
}
// **********************************************/
