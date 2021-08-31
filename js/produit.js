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
                                                                            <select name="option_lense" id="option_lense" class="lenses">
                                                                             
                                                                            </select>
                                                                            <label for="quantity">Quantité</label>
                                                                            <select id="quantity-product" name="quantity-product">
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
       console.log(selectLenses);

       //Le choix de l'utilisateur
       const choixLenses = selectLenses.value; 
       console.log(choixLenses);

       //Le choix d'une quantité
      let quantiteProduit = document.querySelector("#quantity-product").value; 


       // Ajout du produit au panier
       var addPanier = function(name, quantity, price) {

        var items = JSON.parse(localStorage.getItem('produit')) || [];

        var item = items.find(item => item.name === name);
      
        if (item) {
          item.quantity += quantity;
        } else {
          items.push({
            name,
            quantity,
            price
          })
        }

        localStorage.setItem('produit', JSON.stringify(items));
        console.log(items);
      }

      //Récupération du choix de l'utilisateur
      let produitSelection = {
           nom: camera.name,
           id: camera._id,
           option: choixLenses,
           quantite: quantiteProduit,
           prix: camera.price / 100,
        }

        console.log(produitSelection);

       //fenêtre de confirmation et retour à l'accueil ou aller au panier
       const fenetreConfirmation = () =>{
           if(window.confirm(`${camera.name} option: ${choixLenses} , quantité: ${quantiteProduit} a bien été ajouté au panier
           Appuyez sur OK pour consulter le panier ou sur ANNULER pour revenir à la page d'accueil`)) {
               window.location.href ="panier.html";
           }
           else{
               window.location.href ="index.html";
           }
        }

        console.log(localStorage.getItem("produit"));
       //si déja produits enregistrés
        if(localStorage.getItem("produit") ) {
            fenetreConfirmation();          
            let produitEnregistre = [];
            produitEnregistre.push(produitSelection);
            localStorage.setItem("produit", JSON.stringify(produitSelection)) 
            console.log(produitEnregistre);
            
        }  else {
            //Local storage
            let produitEnregistre = JSON.parse(localStorage.getItem("produit"));
            produitEnregistre.push(produitSelection);
            localStorage.setItem("produit", JSON.stringify(produitSelection)) 
            console.log(produitEnregistre);
            fenetreConfirmation();
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

 

