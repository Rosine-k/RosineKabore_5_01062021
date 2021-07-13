fetch('http://localhost:3000/api/cameras')
   .then(data => data.json())
   .then(jsonListCamera => {
        for(let jsonCamera of jsonListCamera){
           let camera = new Camera(jsonCamera);
           document.querySelector(".card-produit") .innerHTML +=    `<div class="col-sm-6">
                                                                        <div class="card">
                                                                            <img class="card-img-top" src="${camera.imageUrl}" width="250" height="250" alt="zurss">
                                                                            <div class="card-body bgc-primary">
                                                                                <h3 class="card-title black">${camera.name}</h3>
                                                                                <h4 class="card-price black">${camera.price}</h4>
                                                                                <label for="choice">Choisissez une option</label>
                                                                                <select>
                                                                                    <option>${camera.lenses}</option>
                                                                                </select>
                                                                                <button class="btn addPanier" type="button" data-id=${camera.id}>Ajouter au panier</button>
                                                                           </div>
                                                                        </div>       
                                                                    </div>` ;
        }
        document.querySelectorAll("addPanier").forEach(panier => {
           panier.addEventListener("click",function(){
               addPanier(this.dataset.id);
           }) 
        })
    }); 
