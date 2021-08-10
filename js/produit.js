(async function() {
  const cameraId = getCameraId();
  const camera = await showCamera(cameraId);
})()

//récupération de l'id du produit
function getCameraId() {
  return new URL(location.href).searchParams.get("id");
}

//récupération des informations de l'id sélectionné
function showCamera(cameraId) {
  return fetch(`http://localhost:3000/api/cameras/${cameraId}`)
   .then(data => data.json())
   .then(jsonCamera => {
       let camera = new Camera(jsonCamera);
       document.querySelector(".card-produit") .innerHTML +=    `<div class="col-sm-8 mx-auto">
                                                                    <div class="card">
                                                                        <img class="card-img-top" src="${camera.imageUrl}" width="250" height="250" alt="zurss">
                                                                        <div class="card-body bgc-primary">
                                                                            <h3 class="card-title black">${camera.name}</h3>
                                                                            <h4 class="card-price black">${camera.price / 100} €</h4>
                                                                            <label for="choice">Choisissez une option</label>
                                                                            <select name="option_lense" class="lenses">
                                                                             
                                                                            </select>
                                                                            <label for="quantity">Quantité</label>
                                                                            <select name="quantity-product">
                                                                              <option>1</option>
                                                                              <option>2</option>
                                                                              <option>3</option>
                                                                              <option>4</option>
                                                                              <option>5</option>
                                                                              <option>6</option>
                                                                              <option>7</option>
                                                                              <option>8</option>
                                                                              <option>9</option>
                                                                              <option>10+</option>
                                                                            </select>

                                                                            <button class="btn btn-panier border-dark addPanier" type="button">Ajouter au panier</button>
                                                                        </div>
                                                                    </div>       
                                                                </div>` ; 
    addProductOption(jsonCamera);

    //Sélection du bouton
    const btnPanier = document.querySelector(".btn-panier");
    console.log(btnPanier);

    //Envoie au panier
    btnPanier.addEventListener("click", (event)=> {
     event.preventDefault();

     //sélection des options
     const selectLenses = document.querySelector("#option_lense");

    //Le choix de l'utilisateur
    const choixLenses = selectLenses.Value; 
    console.log(choixLenses);

   //Récupération du choix de l'utilisateur
   let produitSelection = {
     nom: camera.name,
     id: camera._id,
     option: selectLenses,
     quantite: quantiteProduit,
     prix: camera.price / 100,
    }

 console.log(produitSelection);

 //Le choix d'une quantité
 let quantiteProduit = document.queryselector("#quantity-product");

 //Local storage
 let produitEnregistre = JSON.parse(localStorage.getItem("produit"));

 //si déja produits enregistrés
 if(produitEnregistre) {
   produitEnregistre.push(produitSelection);
   localStorage.setItem("produit", JSON.stringify()) 
   console.log(produitEnregistre);
   fenetreConfirmation();
 }
 //si panier vide
 else{
   produitEnregistre = [];
   produitEnregistre.push(produitSelection);
   localStorage.setItem("produit", JSON.stringify()) 
   console.log(produitEnregistre);
   fenetreConfirmation();
 }

 //fenêtre de confirmation et retour à l'accueil ou aller au panier
 const fenetreConfirmation = () =>{
   if(window.confirm(`${camera.name} option: ${itemOption} a bien été ajouté au panier
    Appuyez sur OK pour consulter le panier ou sur ANNULER pour revenir à la page d'accueil`)) {
    window.location.href ="panier.html";
   }
   else{
     window.location.href ="index.html";
   }
  }
   
});
  })
}

//récupération des options
function addProductOption(jsonCamera) {
  for(let itemOption of jsonCamera.lenses) {
    document.querySelector(".lenses").innerHTML += `<option>${itemOption}</option>`;
  }
}

//ajouter l'article au panier
const addPanier = (productData, idElem) =>{

  let arrayCart = [];
  let isAdded = false;

  //si le panier est vide
  if (sessionStorage.getItem('produit') === null)
  {
      arrayCart = [{value: document.getElementById(idElem).value, id: productData._id}]
      sessionStorage.setItem('produit', JSON.stringify(arrayCart));
      sessionStorage.setItem('prixTotal', productData.price);
  }

  //si le panier n'est pas vide
  else
  {   
      arrayCart = JSON.parse(sessionStorage.getItem('products'));

      //Vérifier si le prdouit est déjà ajouté au panier ou pas
      for(let product of arrayCart)
      {
          if(product.id === productData._id){
              isAdded = true;
          }
      }

      //ajouter le produit au panier s'il ne l'est pas
      if(!isAdded)
      {
          arrayCart.push(({
              value: document.getElementById(idElem).value,
              id: productData._id
              }));
              sessionStorage.setItem('products', JSON.stringify(arrayCart));

          let prixActu =  parseFloat(sessionStorage.getItem('prixTotal')) + productData.price;
          sessionStorage.setItem('prixTotal', prixActu);

      }

  }

  //Aficher un message de notification en cas de succès ou de l'echec de l'ajout au panier
  displayMessage(isAdded);
  
}







  

 
  

