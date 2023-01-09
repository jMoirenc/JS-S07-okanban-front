
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

    const addCardButtonElements = document.querySelectorAll('.addCardButton');    

    for (const addCardButtonElement of addCardButtonElements){
      addCardButtonElement.addEventListener('click', app.showAddCardModal);
    }    

    const formAddCardElement =  document.querySelector('#addCardModal form');
    formAddCardElement.addEventListener('submit', app.submitAddCardForm);
  },

  showAddListModal(){
    const modalElement = document.getElementById('addListModal');    
    modalElement.classList.add('is-active');
  },

  showAddCardModal(event){

    const clickedButton = event.currentTarget;
    const listElement = clickedButton.closest('.okblist');
    const listId = listElement.dataset.listId;

    const modalElement = document.getElementById('addCardModal');    

    modalElement.classList.add('is-active');

    modalElement.querySelector('[name=list_id]').value = listId;
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

    // temporaire, en attendant l'api
    data.id = Math.floor(Math.random() * 10000);
    
    app.makeListInDOM(data);

    formElement.reset();

    app.hideModal(event);
  },

  makeListInDOM(data){
    console.log(data);   

    const templateListElement = document.getElementById('listTemplate');
    const newListElement = templateListElement.content.cloneNode(true);
    newListElement.querySelector('.okblist-title').textContent = data.name;

    console.log(newListElement.dataset);

    newListElement.querySelector('.okblist').dataset.listId = data.id;

    newListElement.querySelector('.addCardButton').addEventListener('click', app.showAddCardModal);    

    const listsContainerElements = document.querySelector('.okblists');
    listsContainerElements.append(newListElement);
  },

  submitAddCardForm(event){
    event.preventDefault();
    const formElement = event.currentTarget;
    const addCardFormData = new FormData(formElement);
    const data = Object.fromEntries(addCardFormData); 

    // temporaire, en attendant l'api
    data.id = Math.floor(Math.random() * 10000);
    
    app.makeCardInDOM(data);

    formElement.reset();

    app.hideModal(event);
  },

  makeCardInDOM(data){
    console.log(data);
    const templateCardElement = document.getElementById('cardTemplate');
    const newCardElement = templateCardElement.content.cloneNode(true);
    newCardElement.querySelector('.okbcard-content').textContent = data.content;

    newCardElement.querySelector('.okbcard').dataset.cardId = data.id;

    const listElement = document.querySelector(`[data-list-id="${data.list_id}"]`);

    const cardsContainerElement = listElement.querySelector('.okbcards');

    cardsContainerElement.append(newCardElement);
  },


  // fonction d'initialisation, lancée au chargement de la page
  init() {
    console.log('app.init !!');
    app.addListenerToActions();
  }

};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );