const utilsModule = {
  base_url: 'http://localhost:3000',

  hideModal(){
    const modalElement = document.querySelector('.modal.is-active');
    if (modalElement){
      modalElement.classList.remove('is-active');
    }    
  },

};