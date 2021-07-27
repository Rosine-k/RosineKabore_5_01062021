(function () {
  'use strict'
  
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  
  // Loop over them and prevent submission
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

function addPanier(cameraId){
  let listPanier = getPanier();
  listPanier.push(cameraId);
  savePanier(listPanier);
}

function getPanier(){
  let listPanier = localStorage.getItem("listPanier");
  if(listPanier == null){
    return [];
  }else{
    return JSON.parse(listPanier);
  }
}

function removePanier(){
  let listPanier = getPanier();
  listPanier = listPanier.filer(panier => panier.id != cameraId);
  savePanier(listPanier);
}

function savePanier(listPanier){
  localStorage.setItem("listPanier", JSON.stringify(listPanier));
}

fetch('http://localhost:3000/api/cameras')
 .then(data => data.json())
 .then(jsonListCamera => {
     for(let jsonCamera of jsonListCamera){
        let camera = new Camera(jsonCamera);
    document.querySelector(".card-panier") .innerHTML +=  `<div class="col-sm-6">
                                                             <div class="card">
                                                               <img class="card-img-top" src="${camera.imageUrl}" width="100" height="100" alt="zurss">
                                                               <div class="card-body bgc-primary">
                                                                 <h2 class="card-title black">${camera.name}</h2>
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
    
                                                                  <button class="btn remove" type="button">Supprimer</button>
                                                                  <div class="card-text">Total () : </div>
    
                                                                </div>
                                                              </div>        
                                                            </div>` ;
  }
  
}); 