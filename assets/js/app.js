
// on objet qui contient des fonctions
var app = {  

  addListenerToActions(){
    const addListButtonElement = document.getElementById('addListButton');    
    addListButtonElement.addEventListener('click', listModule.showAddListModal);

    const closeModalElements = document.querySelectorAll('.modal .close');
    closeModalElements.forEach((closeModalElement) => {
      closeModalElement.addEventListener('click', utilsModule.hideModal);
    });

    const formAddListElement =  document.querySelector('#addListModal form');
    formAddListElement.addEventListener('submit', listModule.submitAddListForm);

    const formAddCardElement =  document.querySelector('#addCardModal form');
    formAddCardElement.addEventListener('submit', cardModule.submitAddCardForm);
  },

  // fonction d'initialisation, lancée au chargement de la page
  init() {
    console.log('app.init !!');
    app.addListenerToActions();
    listModule.getListsFromAPI();
  }

};

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );