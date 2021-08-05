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
                                          <div class="card-text">Total: ${produitEnregistre[j].price / 100} €</div>
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