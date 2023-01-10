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
  },

  makeListInDOM(data){
    console.log(data);   

    const templateListElement = document.getElementById('listTemplate');
    const newListElement = templateListElement.content.cloneNode(true);
    newListElement.querySelector('.okblist-title').textContent = data.name;

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


};