const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', showModal);
refs.closeModalBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', closeEsc);
function closeEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

function showModal() {
  refs.modal.classList.toggle('is-hidden');
  const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  const body = document.body;
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
}

function closeModal() {
  refs.modal.classList.toggle('is-hidden');
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

// window.addEventListener('scroll', () => {
//   document.documentElement.style.setProperty(
//     '--scroll-y',
//     `${window.scrollY}px`
//   );
// });
