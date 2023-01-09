
// on objet qui contient des fonctions
var app = {

  base_url: 'http://localhost:3000',

  async getListsFromAPI (){
    try {
      const response = await fetch(`${app.base_url}/lists`);
      
      if (!response.ok){
        throw new Error('Pb pour récupérer les listes');
      }

      const lists = await response.json();

      for (const list of lists){
        app.makeListInDOM(list);
      }

    }catch (e){
      console.log(e);
    }  

  },

  addListenerToActions(){
    const addListButtonElement = document.getElementById('addListButton');    
    addListButtonElement.addEventListener('click', app.showAddListModal);

    const closeModalElements = document.querySelectorAll('.modal .close');
    closeModalElements.forEach((closeModalElement) => {
      closeModalElement.addEventListener('click', app.hideModal);
    });

    const formAddListElement =  document.querySelector('#addListModal form');
    formAddListElement.addEventListener('submit', app.submitAddListForm);

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

  hideModal(){
    const modalElement = document.querySelector('.modal.is-active');
    if (modalElement){
      modalElement.classList.remove('is-active');
    }    
  },

  async submitAddListForm(event){
    event.preventDefault();
    const formElement = event.currentTarget;
    const addListFormData = new FormData(formElement);
    // const data = Object.fromEntries(addListFormData); 

    const response = await fetch(
      `${app.base_url}/lists`,
      {
        method: 'POST',
        body: addListFormData,
      }
    );
      
    if (!response.ok){
      throw new Error('Pb pour ajouter la liste');
    }

    const data = await response.json();
    
    // data.id = Math.floor(Math.random() * 10000);
    
    app.makeListInDOM(data);

    formElement.reset();

    app.hideModal();
  },

  makeListInDOM(data){
    console.log(data);   

    const templateListElement = document.getElementById('listTemplate');
    const newListElement = templateListElement.content.cloneNode(true);
    newListElement.querySelector('.okblist-title').textContent = data.name;

    newListElement.querySelector('.okblist').dataset.listId = data.id;

    newListElement.querySelector('.addCardButton').addEventListener('click', app.showAddCardModal);    

    const listsContainerElements = document.querySelector('.okblists');
    listsContainerElements.append(newListElement);

    if (data.cards){
      for (const card of data.cards){
        app.makeCardInDOM(card);
      }      
    }
  },

  async submitAddCardForm(event){
    event.preventDefault();
    const formElement = event.currentTarget;
    const addCardFormData = new FormData(formElement);
    
    //const data = Object.fromEntries(addCardFormData); 

    // temporaire, en attendant l'api
    // data.id = Math.floor(Math.random() * 10000);
    
    const response = await fetch(
      `${app.base_url}/cards`,
      {
        method: 'POST',
        body: addCardFormData,
      }
    );
      
    if (!response.ok){
      throw new Error('Pb pour ajouter la carte');
    }

    const data = await response.json();

    app.makeCardInDOM(data);

    formElement.reset();

    app.hideModal();
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
    app.getListsFromAPI();
  }

};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );