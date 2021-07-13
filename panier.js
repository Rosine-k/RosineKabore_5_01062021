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

  function savePanier(listPanier){
    localStorage.setItem("listPanier", JSON.stringify(listPanier));
  }