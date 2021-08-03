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

