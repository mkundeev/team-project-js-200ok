import { MovieService } from '../service/fetchItems';

// console.log(MovieService.getMovieTrend());

const paginationEl = document.querySelector('.pagination__list');

paginationEl.addEventListener('click', onRenderGallery);

let totalPages = 50;
let page = 1;

paginationEl.innerHTML = createPagination(totalPages, page);

function createPagination(totalPages, page) {
  let paginationItem = '';
  let activePage = '';
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 1) {
    paginationItem += `<li class="pagination__item">
      <span class="pagination__btn-minus" data-action="minus">-</span>
    </li>`;
  }

  if (page > 2) {
    paginationItem += `<li class="pagination__item"><span class="pagination__number" data-action="1">1</span></li>`;
    if (page > 3) {
      paginationItem += `<li class="pagination__item"><span class="pagination__dots" data-action="dots-minus">...</span></li>`;
    }
  }

  if (page === totalPages) {
    beforePage = beforePage - 2;
  } else if (page === totalPages - 1) {
    beforePage = beforePage - 1;
  }

  if (page === 1) {
    afterPage = afterPage + 2;
  } else if (page === 2) {
    afterPage = afterPage + 1;
  }

  for (let plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }

    if (plength === 0) {
      plength = plength + 1;
    }

    if (page === plength) {
      activePage = 'activePage';
    } else {
      activePage = '';
    }
    paginationItem += `<li class="pagination__item ${activePage}"><span class="pagination__number" data-action="${plength}">${plength}</span></li>`;
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      paginationItem += `<li class="pagination__item"><span class="pagination__dots" data-action="dots-plus">...</span></li>`;
    }
    paginationItem += `<li class="pagination__item"><span class="pagination__number" data-action="${totalPages}">${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    paginationItem += `<li class="pagination__item">
      <span class="pagination__btn-plus" data-action="plus">+</span>
    </li>`;
  }

  paginationEl.innerHTML = paginationItem;
  return paginationItem;
}

function onRenderGallery(event) {
  const dataSet = event.target.dataset.action;
  const dots = 3;

  if (Number(dataSet)) {
    page = Number(dataSet);
  } else {
    if (dataSet === 'minus') {
      page -= 1;
    }
    if (dataSet === 'plus') {
      page += 1;
    }
    if (dataSet === 'dots-minus') {
      page -= dots;
    }
    if (dataSet === 'dots-plus') {
      page += dots;
    }
  }

  createPagination(totalPages, page);
}
