//verification de la validité des champs du formulaire
(function () {
  'use strict'
  
  var forms = document.querySelectorAll('.needs-validation')
  
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      
      form.classList.add('was-validated')
    }, false)
  })
})()

//récupération des donnés du local storage
let produitEnregistre = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistre);


const elementsPanier = document.querySelector(".card-panier");
console.log(elementsPanier);

//affichage si aucun produit n'est dans le panier
if(produitEnregistre === null) {
  const panierVide = ` <div class="col-sm-6">
                        <div class="card">
                          <div class="card-body bgc-primary">
                           <h2 class="card-title black">Le panier est vide</h2>
                          </div>
                        </div>        
                      </div>`;
  elementsPanier.innerHTML = panierVide;                    
}
//affichage s'il y a un ou plusieurs produits dans le panier
else {
 let panierRempli = [];

 for(j=0; j < produitEnregistre.length; j++) {
   panierRempli = panierRempli + `  <div class="col-sm-6">
                                      <div class="card">
                                        <img class="card-img-top" src="${produitEnregistre[j].imageUrl}" width="100" height="100" alt="zurss">
                                        <div class="card-body bgc-primary">
                                          <h2 class="card-title black">${produitEnregistre[j].name}</h2>
                                          <div class="quantity-panier">Quantité: ${produitEnregistre[j].quantiteProduit}</div>
                                          <div class="option-panier">Option: ${produitEnregistre[j].selectLenses}</div>
                                          <div class="card-text prixToal">Total: €</div>
                                          <button class="btn btn-remove border-dark" type="button">Supprimer</button>
                                        </div>
                                      </div>        
                                    </div>`;
  }
  if(j == produitEnregistre.length) {
    elementsPanier.innerHTML = panierRempli;
  }
}

// Bouton pour supprimer un article
const removePanier = document.querySelectorAll(".btn-remove");
 removePanier.forEach((btn, i) => {
    btn.addEventListener('click', e => {
      deleteItemSelect(i);
    });

   //Mettre à jour le prix total 
   let majPrice =  parseFloat(sessionStorage.getItem('prixTotal')) - (data.price * productQuantity);
   sessionStorage.setItem('prixTotal', majPrice);

   //Mettre en forme le prix total
   majPrice = priceFormat(sessionStorage.getItem('prixTotal'));
   document.getElementById('prixTotal').textContent = "TOTAL (TTC) : " + majPrice;

   //Vider le local storage si tous les produits sont supprimés du panier
   if(JSON.parse(sessionStorage.getItem('prixTotal')) == 0){
      sessionStorage.clear();
      document.location.reload();
   }
    
 });  

// Suppression de l'article dans le LocalStorage
function RemoveArticlePanier(index) {
  items.splice(index, 1);
  localStorage.setItem('anyItem', JSON.stringify(items));

  if (items.length === 0) {
      localStorage.removeItem('anyItem');
  }
  majArticles();
}  



//Envoi des données du formulaire de commande au serveur
let formulaire = document.getElementById("formulaire");

formulaire.addEventListener("submit", (e) =>{

    e.preventDefault();

    let arrayCart = JSON.parse(sessionStorage.getItem('products'));

    let idProducts = [];
    
    for(let product of arrayCart){
        idProducts.push(product.id);
    }
    
    fetch("http://localhost:3000/api/cameras/order", {

    method: "POST",
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
        contact: {
            firstName: form.elements.firstName.value,
            lastName: form.elements.lastName.value,
            address: form.elements.address.value,
            city: form.elements.city.value,
            email: form.elements.email.value

        },
        products: idProducts
})
      
})
.then(response => response.json())
  
.then(response => document.location.href=`confirmation.html?idCommande=${response.orderId}&pseudo=${form.elements.firstName.value}`);


})

//Mis à jour du prix d'un produit en fonction de la quantité 
const updatePrice = (data, newQuantity, lastQuantity) =>{

  //calculer la différence avec le prix envoyé précédemment
  let diffrence = (data.price) * (newQuantity - lastQuantity);

  //mettre à jour le prix total actuel
  let currentTotalPrice = parseFloat(sessionStorage.getItem('prixTotal'));
  let updatedTotalPrice = currentTotalPrice + diffrence;
  sessionStorage.setItem('prixTotal', updatedTotalPrice);

  //récupérer le nouveau prix et l'insérer dans la page
  let newProductPrice = (data.price) * (newQuantity);
  newProductPrice = priceFormat(newProductPrice);
  document.getElementById(data.name + "_" +data._id).textContent = newProductPrice;
  
  //récupérer le nouveau prix total et l'insérer dans la page
  updatedTotalPrice = priceFormat(updatedTotalPrice);
  document.getElementById('prixTotal').textContent = "TOTAL (TTC) : " + updatedTotalPrice;
}