import { refs } from '../service/refs';
const { movieContainer, closeModalBtn, modal, body } = refs;

//======открытие модального окна авторизации и футера==============

controlModal('[data-modal-open]', '[data-modal-close]', '[data-modal]');
controlModal('.js-site-nav', '.js-btn-modal', '.js-auth-modal');

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
    refs.body.classList.add('modal-open');
    evt.preventDefault();
    evt.stopPropagation();
    document.addEventListener('keydown', closeEsc);
    refs.modal.classList.toggle('is-hidden');
  }
  function closeModal(evt) {
    refs.modal.classList.toggle('is-hidden');
    document.removeEventListener('keydown', closeEsc);
    refs.body.classList.remove('modal-open');
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
//======открытие модального окна с подробной информацией о фильме==============


movieContainer.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', closeModal);


function closeEmptyField(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal();
  }
}
function showModal(evt) {
  evt.preventDefault();
  modal.addEventListener('click', closeEmptyField);
  if (evt.target.tagName !== 'UL') {
    document.addEventListener('keydown', closeEsc);
    body.classList.add('modal-open');
    modal.classList.toggle('is-hidden');
  }
}
function closeModal() {
  modal.removeEventListener('click', closeEmptyField);
  modal.classList.toggle('is-hidden');
  document.removeEventListener('keydown', closeEsc);
  body.classList.remove('modal-open');
  refs.cardModalMovie.innerHTML = ''
}

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}
