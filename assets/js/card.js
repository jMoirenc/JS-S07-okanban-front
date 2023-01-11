const cardModule = {

  showAddCardModal(event) {

    const clickedButton = event.currentTarget;
    const listElement = clickedButton.closest('.okblist');
    const listId = listElement.dataset.listId;

    const modalElement = document.getElementById('addCardModal');

    modalElement.classList.add('is-active');

    modalElement.querySelector('[name=list_id]').value = listId;
  },

  async submitAddCardForm(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const addCardFormData = new FormData(formElement);

    //const data = Object.fromEntries(addCardFormData); 

    // temporaire, en attendant l'api
    // data.id = Math.floor(Math.random() * 10000);

    const response = await fetch(
      `${utilsModule.base_url}/cards`, {
        method: 'POST',
        body: addCardFormData,
      }
    );

    if (!response.ok) {
      throw new Error('Pb pour ajouter la carte');
    }

    const data = await response.json();

    cardModule.makeCardInDOM(data);

    formElement.reset();

    utilsModule.hideModal();
  },

  async deleteCard(event) {
    const target = event.currentTarget;
    const cardElement = target.closest('.okbcard');
    const cardId = cardElement.dataset.cardId;
    try {
      if (confirm('on la supprime cette carte ?')) {
        const response = await fetch(
          `${utilsModule.base_url}/cards/${cardId}`, {
            method: "DELETE",
          },
        );

        cardElement.remove();
      }
    } catch (e) {
      console.error(e);
    }
  },

  makeCardInDOM(data) {
    console.log(data);
    const templateCardElement = document.getElementById('cardTemplate');
    const newCardElement = templateCardElement.content.cloneNode(true);
    newCardElement.querySelector('.okbcard-content').textContent = data.content;

    newCardElement.querySelector('.okbcard').dataset.cardId = data.id;

    newCardElement.querySelector('.okbcard').addEventListener('click', cardModule.deleteCard);

    const listElement = document.querySelector(`[data-list-id="${data.list_id}"]`);

    const cardsContainerElement = listElement.querySelector('.okbcards');

    cardsContainerElement.append(newCardElement);
  },

};