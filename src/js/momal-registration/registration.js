const refs = {
  btnAutorization: document.querySelector('.auth-btn'),
  btnRegistration: document.querySelector('.regist-btn'),
  formAutorization: document.querySelector('.form-authorization'),
  formRegistration: document.querySelector('.form-register'),
  closeModalBtnAuth: document.querySelector('.js-btn-modal'),
  openModalAuth: document.querySelector('.js-site-nav'),
  modalAuth: document.querySelector('.js-auth-modal'),
};

refs.btnAutorization.addEventListener('click', onAutorization);
refs.btnRegistration.addEventListener('click', onRegistration);

function onAutorization() {
  refs.formRegistration.classList.add('visually-hidden');
  refs.formAutorization.classList.remove('visually-hidden');
  refs.btnRegistration.classList.remove('is-active-btn');
  refs.btnAutorization.classList.add('is-active-btn');
}
function onRegistration() {
  refs.formAutorization.classList.add('visually-hidden');
  refs.formRegistration.classList.remove('visually-hidden');
  refs.btnAutorization.classList.remove('is-active-btn');
  refs.btnRegistration.classList.add('is-active-btn');
}

//відкриття модалки

refs.closeModalBtnAuth.addEventListener('click', toggleModalClose);
refs.openModalAuth.addEventListener('click', toggleModalOpen);
refs.modalAuth.addEventListener('click', onClickBackdrop);

function toggleModalClose(e) {
  e.preventDefault();

  closeModal();
  window.addEventListener('keydown', onEskClose); //виклик слухача клавіатури

  function onEskClose(event) {
    if (event.code === 'Escape') {
      closeModal();
    }

    window.removeEventListener('keydown', onEskClose); //зняття слухача з клавіатури
  }
}
function onClickBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function toggleModalOpen(e) {
  e.preventDefault();
  opemModal();
}

function closeModal() {
  refs.modalAuth.classList.add('visually-hidden');
}
function opemModal() {
  refs.modalAuth.classList.remove('visually-hidden');
}
