//Récupération du numéro de commande dans l'URL
const str = window.location.href;
const url = new URL(str);
const idOrderURL = url.searchParams.get("orderId");

//Affichage du numéro de commande
const orderIdNumberElt = document.querySelector("#orderId");
orderIdNumberElt.innerHTML = idOrderURL;
