
// on objet qui contient des fonctions
var app = {
  addListenerToActions(){
    const addListButtonElement = document.getElementById('addListButton');    
    addListButtonElement.addEventListener('click', app.showAddListModal);

    const closeModalElements = document.querySelectorAll('.modal .close');
    closeModalElements.forEach((closeModalElement) => {
      closeModalElement.addEventListener('click', app.hideModal);
    });
  },

  showAddListModal(){
    const modalElement = document.getElementById('addListModal');    
    modalElement.classList.add('is-active');
  },

  hideModal(event){
    const clickedButttonElement = event.currentTarget;
    const modalElement = clickedButttonElement.closest('.modal');
    modalElement.classList.remove('is-active');
  },


  // fonction d'initialisation, lancée au chargement de la page
  init() {
    console.log('app.init !');
    app.addListenerToActions();
  }

};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );