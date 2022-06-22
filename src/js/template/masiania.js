import {
  masianiaEl,
  masianiaMessage,
  masianiaTextEl,
  masianiaBtnListEl,
  masianiaBtnCloseEl,
  masianiaLinkEl,
  masianiaRightEl,
} from '../service/refs';

masianiaBtnCloseEl.addEventListener('click', onCloseMasiania);
masianiaLinkEl.addEventListener('click', onHideMasiania);

const MASIANIA_DELAY = 20000;

let line = 0;
let count = 0;
let out = '';
const messageMasianiaClose = '<span style="font-size: 30px">Жадіна!</span>';

const masianiaText = [
  'Привіт!<br/>\n',
  'Бажаєш купити слоника,<br/>\n',
  'чи допомогти ЗСУ?',
];

function masianiaTextLine() {
  let timeout = setTimeout(() => {
    out += masianiaText[line][count];
    masianiaTextEl.innerHTML = out + '|';
    count++;

    if (count >= masianiaText[line].length) {
      count = 0;
      line++;
      if (line === masianiaText.length) {
        clearTimeout(timeout);
        masianiaTextEl.innerHTML = out;
        return true;
      }
    }
    masianiaTextLine();
  }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    masianiaRightEl.classList.add('masiania-right-show');
    setTimeout(() => {
      masianiaRightEl.classList.remove('masiania-right-show');
    }, 8000);
  }, 100000);
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    masianiaEl.classList.add('masiania-show');
    setTimeout(() => {
      masianiaEl.classList.remove('masiania-show');
    }, 30000);
    setTimeout(() => {
      masianiaMessage.classList.remove('is-hidden');
      masianiaTextLine();
      setTimeout(() => {
        masianiaBtnListEl.classList.remove('is-hidden');
        masianiaBtnCloseEl.classList.remove('is-hidden');
      }, 4000);
    }, 2000);
  }, MASIANIA_DELAY);
});

function onCloseMasiania() {
  masianiaBtnListEl.classList.add('is-hidden');
  masianiaTextEl.innerHTML = messageMasianiaClose;
  masianiaBtnCloseEl.classList.add('is-hidden');
  setTimeout(() => {
    masianiaMessage.classList.add('is-hidden');

    masianiaEl.classList.remove('masiania-show');
  }, 2000);
}

function onHideMasiania() {
  masianiaEl.classList.remove('masiania-show');
}
