(async function() {
  const cameraId = getCameraId()
  const camera = await getCamera(cameraId)
  hydrateCamera(camera)
})()

function getCameraId() {
  return new URL(location.href).searchParams.get("id")
}

function getCameraId(cameraId) {
  return fetch(`http://localhost:3000/api/cameras/${cameraId}`)
   .then(data => data.json())
   .then(jsonListCamera => {
     for(let jsonCamera of jsonListCamera){
       let camera = new Camera(jsonCamera);
       document.querySelector(".card-produit") .innerHTML +=    `<div class="col-sm-8">
                                                                    <div class="card">
                                                                        <img class="card-img-top" src="${camera.imageUrl}" width="250" height="250" alt="zurss">
                                                                        <div class="card-body bgc-primary">
                                                                            <h3 class="card-title black">${camera.name}</h3>
                                                                            <h4 class="card-price black">${camera.price} €</h4>
                                                                            <label for="choice">Choisissez une option</label>
                                                                            <select>
                                                                             <option>${camera.lenses}</option>
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

                                                                            <button class="btn btn-panier addPanier" type="button" data-id=${camera._id}>Ajouter au panier</button>
                                                                        </div>
                                                                    </div>       
                                                                </div>` ; 

   }})
}


   
   

  

 
  

