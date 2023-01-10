const listModule = {
  async getListsFromAPI (){
    try {
      const response = await fetch(`${utilsModule.base_url}/lists`);
      
      if (!response.ok){
        throw new Error('Pb pour récupérer les listes');
      }

      const lists = await response.json();

      for (const list of lists){
        listModule.makeListInDOM(list);
      }

    }catch (e){
      console.log(e);
    }  

  },

  showAddListModal(){
    const modalElement = document.getElementById('addListModal');    
    modalElement.classList.add('is-active');
  },

  async submitAddListForm(event){
    try {
      event.preventDefault();
      const formElement = event.currentTarget;
      const addListFormData = new FormData(formElement);
      // const data = Object.fromEntries(addListFormData); 

      const response = await fetch(
        `${utilsModule.base_url}/lists`,
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
      
      listModule.makeListInDOM(data);

      formElement.reset();

      utils.hideModal();
    }catch (e){
      console.log(e);
    }
  },

  async submitEditListForm(event){
    try{
      event.preventDefault();
      const formElement = event.currentTarget;
      const editListFormData = new FormData(formElement);
      const listId = formElement.closest('.okblist').dataset.listId;

      const response = await fetch(
        `${utilsModule.base_url}/lists/${listId}`,
        {
          method: 'PATCH',
          body: editListFormData,
        }
      );
        
      if (!response.ok){
        throw new Error('Pb édition de la liste');
      }

      const data = await response.json();
      
      formElement.parentElement.querySelector('h2').textContent = data.name;

      listModule.hideEditForm(formElement);
    }catch (e){
      listModule.hideEditForm(formElement);
    }
  },

  makeListInDOM(data){
    console.log(data);   

    const templateListElement = document.getElementById('listTemplate');
    const newListElement = templateListElement.content.cloneNode(true);

    const listTitleElement = newListElement.querySelector('.okblist-title');
    listTitleElement.textContent = data.name;

    listTitleElement.addEventListener('dblclick', listModule.showEditForm);

    newListElement.querySelector('.okblist-form').addEventListener('submit', listModule.submitEditListForm);    

    newListElement.querySelector('.okblist').dataset.listId = data.id;

    newListElement.querySelector('.addCardButton').addEventListener('click', cardModule.showAddCardModal);    

    const listsContainerElements = document.querySelector('.okblists');
    listsContainerElements.append(newListElement);

    if (data.cards){
      for (const card of data.cards){
        cardModule.makeCardInDOM(card);
      }      
    }
  },

  showEditForm(event){
    const target = event.currentTarget;

    target.classList.add('is-hidden');
    const formElement = target.parentElement.querySelector('form');
    formElement.classList.remove('is-hidden');
    const nameInputElement = formElement.querySelector('[name=name]');
    nameInputElement.value = target.textContent;
    nameInputElement.focus();
    nameInputElement.select();
  },

  hideEditForm(formElement){
    formElement.classList.add('is-hidden');
    formElement.parentElement.querySelector('h2').classList.remove('is-hidden');
  },

};