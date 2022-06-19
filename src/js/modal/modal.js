
controlModal(
  '[data-modal-open]',
  '[data-modal-close]',
  '[data-modal]'
);
 controlModal(
  '.js-site-nav',
  '.js-btn-modal',
  '.js-auth-modal'
);
// controlModal(
//   '.films__gallery',
//   '.modal__close-button',
//   '.js-backdrop'
// );


function controlModal(openModalBtn, closeModalBtn, modal) {
  const refs = {
    openModalBtn: document.querySelector(openModalBtn),
    closeModalBtn: document.querySelector(closeModalBtn),
    modal: document.querySelector(modal),
    body: document.querySelector('body'),
  };

  function closeEmptyField(evt) {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  }
  function showModal(evt) {
    refs.body.classList.add('modal-open')
    evt.preventDefault();
    evt.stopPropagation();
    document.addEventListener('keydown', closeEsc);
    refs.modal.classList.toggle('is-hidden');
  }
  function closeModal(evt) {
    refs.modal.classList.toggle('is-hidden');
    document.removeEventListener('keydown', closeEsc);
    refs.body.classList.remove('modal-open')
  }

  function closeEsc(evt) {
    if (evt.key === 'Escape') {
      closeModal();
    }
  }

  refs.openModalBtn.addEventListener('click', showModal);
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.modal.addEventListener('click', closeEmptyField);
}
//====================test==========================//
// class Modal{
//   construktor(openBtn, closeBtn, modal) {
//     this.openModalBtn = document.querySelector(openModalBtn);
//     this.closeModalBtn = document.querySelector(closeModalBtn);
//     this.modalEl = document.querySelector(modal);
//     this.body = document.querySelector('body');
    
//   }
//   addEventListners() {
//     this.openModalBtn.addEventListener('click', this.showModal);
//     this.closeModalBtn.addEventListener('click', this.closeModal);
//     this.modalEl.addEventListener('click', this.closeEmptyField);
//   }

//   closeEmptyField(evt) {
//     if (evt.target === evt.currentTarget) {
//       this.closeModal();
//     }
//   }
//   showModal(evt) {
//     this.body.classList.add('modal-open')
//     evt.preventDefault();
//     evt.stopPropagation();
//     document.addEventListener('keydown', closeEsc);
//     this.modalEl.classList.toggle('is-hidden');
//   }
//   closeModal(evt) {
//     this.modalEl.classList.toggle('is-hidden');
//     document.removeEventListener('keydown', closeEsc);
//     this.body.classList.remove('modal-open')
//   }

//   closeEsc(evt) {
//     if (evt.key === 'Escape') {
//       this.closeModal;
//     }
//   }

// }

// const authModal = new Modal('.js-site-nav', '.js-btn-modal', '.js-auth-modal');
// authModal.addEventListener
// console.log(authModal)

const refModal = {
    openModalBtn: document.querySelector('.films__gallery'),
    closeModalBtn: document.querySelector('.modal__close-button'),
  modal: document.querySelector('.js-backdrop'),
    body: document.querySelector('body'),
  };

 refModal.openModalBtn.addEventListener('click', showModal);
  refModal.closeModalBtn.addEventListener('click', closeModal);
refModal.modal.addEventListener('click', closeEmptyField);
  
  function closeEmptyField(evt) {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  }
function showModal(evt) {
  evt.preventDefault();
  if(evt.target.tagName !== 'UL')
  {document.addEventListener('keydown', closeEsc);
  refModal.body.classList.add('modal-open');
  refModal.modal.classList.toggle('is-hidden');}
  }
  function closeModal(evt) {
    refModal.modal.classList.toggle('is-hidden');
    document.removeEventListener('keydown', closeEsc);
    refModal.body.classList.remove('modal-open')
  }

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}