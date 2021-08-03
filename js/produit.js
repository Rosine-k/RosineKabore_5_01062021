(async function() {
  const cameraId = getCameraId();
  const camera = await showCamera(cameraId);
})()

function getCameraId() {
  return new URL(location.href).searchParams.get("id");
}

function showCamera(cameraId) {
  return fetch(`http://localhost:3000/api/cameras/${cameraId}`)
   .then(data => data.json())
   .then(jsonCamera => {
       let camera = new Camera(jsonCamera);
       document.querySelector(".card-produit") .innerHTML +=    `<div class="col-sm-8">
                                                                    <div class="card">
                                                                        <img class="card-img-top" src="${camera.imageUrl}" width="250" height="250" alt="zurss">
                                                                        <div class="card-body bgc-primary">
                                                                            <h3 class="card-title black">${camera.name}</h3>
                                                                            <h4 class="card-price black">${camera.price} €</h4>
                                                                            <label for="choice">Choisissez une option</label>
                                                                            <select class="lenses">
                                                                             
                                                                            </select>
                                                                            <label for="quantity">Quantité</label>
                                                                            <select>
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

                                                                            <button class="btn btn-panier border-dark addPanier" type="button" data-id=${camera._id}>Ajouter au panier</button>
                                                                        </div>
                                                                    </div>       
                                                                </div>` ; 
    addProductOption(jsonCamera);
  })
}

function addProductOption(jsonCamera) {
  for(let itemOption of jsonCamera.lenses) {
    document.querySelector(".lenses").innerHTML += `<option>${itemOption}</option>`;
  }
}



//Sélection du bouton
const btnPanier = document.querySelector(".btn-panier");
console.log(btnPanier);

//Envoie au panier
btnPanier.addEventListener("click", (event)=> {
event.preventDefault();

//Le choix de l'utilisateur
const choixLenses = itemOption.Value;
console.log(choixLenses);

//Récupération du choix de l'utilisateur
let produitSelection = {
  nom: camera.name,
  id: camera._id,
  option: itemOption,
  quantite: quantiteProduit,
  prix: camera.price / 100,
}

console.log(produitSelection);
   
})

//Le choix d'une quantité
let quantiteProduit = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

//Local storage



  

 
  

