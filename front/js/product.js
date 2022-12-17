// Récupération de l'id produit via url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
let imgUrl;
let altTxt;
let namepdt;

// Récupération de l'api du produit via l'id
fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((data) => {
    displayProduct(data);
  });

displayProduct = (data) => {
  const displayImg = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  document
    .querySelector(".item__img")
    .insertAdjacentHTML("beforeEnd", displayImg);

  const productName = document.querySelector("#title");
  productName.textContent = data.name;
  const productPrice = document.querySelector("#price");
  productPrice.textContent = data.price
  const productDescription = document.querySelector("#description");
  productDescription.textContent = data.description;
  const productColor = document.querySelector("#colors");
  imgUrl = data.imageUrl;
  altTxt = data.altTxt;
  namepdt = data.name;
  for (i = 0; i < data.colors.length; i++) {
    const OptionsColor = `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
    productColor.insertAdjacentHTML("beforeEnd", OptionsColor);
  }
};

const cartbtn = document.querySelector("#addToCart");
cartbtn.addEventListener("click", () => addCart());
addCart = () => {
  if (quantity.value <= 0 || quantity.value > 100 || colors.value == "") {
    const errorColor = document.querySelector("#colors");
    const errorQuantity = document.querySelector("#quantity");
    errorColor.style.borderColor = "red";
    errorQuantity.style.borderColor = "red";
    return;
  }
  const productLocalstorage = {
    id: id,
    colors: colors.value,
    quantity: Number(quantity.value),
    imageUrl: imgUrl,
    altext: altTxt,
    name: namepdt,
  };
  const key = "product";
  let productsOncart = JSON.parse(localStorage.getItem("product"));
  if (productsOncart) {
    const resultFind = productsOncart.find(
      (el) => el.id === id && el.colors === colors.value
    );
    // Produit déja dans le panier
    if (resultFind) {
      let newQuantite =
        parseInt(productLocalstorage.quantity) + parseInt(resultFind.quantity);
      resultFind.quantity = newQuantite;
      // Produit non présent dans le panier =>
    } else {
      productsOncart.push(productLocalstorage);
    }
    // Panier vide =>
  } else {
    productsOncart = [];
    productsOncart.push(productLocalstorage);
  }
  localStorage.setItem(key, JSON.stringify(productsOncart));
  window.location.href = "cart.html";
};