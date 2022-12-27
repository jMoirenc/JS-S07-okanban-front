
// on objet qui contient des fonctions
var app = {
  addListenerToActions(){
    const addListButtonElement = document.getElementById('addListButton');    
    addListButtonElement.addEventListener('click', app.showAddListModal);

    const closeModalElements = document.querySelectorAll('.modal .close');
    closeModalElements.forEach((closeModalElement) => {
      closeModalElement.addEventListener('click', app.hideModal);
    });

    const formAddListElement =  document.querySelector('#addListModal form');
    formAddListElement.addEventListener('submit', app.submitAddListForm);
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

  submitAddListForm(event){
    event.preventDefault();
    const formElement = event.currentTarget;
    const addListFormData = new FormData(formElement);
    const data = Object.fromEntries(addListFormData); 
    
    app.makeListInDOM(data);

    formElement.reset();

    app.hideModal(event);
  },

  makeListInDOM(data){
    console.log(data);
    const templateListElement = document.getElementById('listTemplate');
    const newListElement = templateListElement.content.cloneNode(true);
    newListElement.querySelector('.list-title').textContent = data.name;

    const listsContainerElements = document.querySelector('.card-lists');
    listsContainerElements.append(newListElement);
  },


  // fonction d'initialisation, lancée au chargement de la page
  init() {
    console.log('app.init !');
    app.addListenerToActions();
  }

};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );