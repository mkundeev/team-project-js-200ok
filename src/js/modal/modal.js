


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
controlModal(
  '.films__gallery',
  '.modal__close-button',
  '.js-backdrop'
);


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

