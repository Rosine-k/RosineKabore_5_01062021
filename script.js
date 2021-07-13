fetch('http://localhost:3000/api/cameras')
   .then(data => data.json())
   .then(jsonListCamera => {
        for(let jsonCamera of jsonListCamera){
           let camera = new Camera(jsonCamera);
           document.querySelector(".card-camera") .innerHTML +=    `<div class="col-sm-6">
                                                                        <a href="produit.html data-id=${camera.id}">
                                                                            <div class="card">
                                                                                <img class="card-img-top" src="${camera.imageUrl}" width="250" height="250" alt="zurss">
                                                                                <div class="card-body bgc-primary">
                                                                                   <h3 class="card-title black">${camera.name}</h3>
                                                                                   <h4 class="card-price black">${camera.price}</h4>
                                                                                   <p class="card-text">Plus de détails</p>
                                                                               </div>
                                                                            </div>       
                                                                        </a> 
                                                                    </div>` ;
        }
    }); 
