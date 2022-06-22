import { MovieService } from '../service/fetchItems';
import { renderMovieGallery } from './renderMarkup';
import { showFilmList, showRecomendedFilms } from '../library/library';
import {
  paginationEl,
  queueBtn,
  watchBtn,
  recommendBtn,
} from '../service/refs';

paginationEl.addEventListener('click', onRenderGallery);

let page = MovieService._page;

export function createPagination() {
  page = MovieService._page;
  let totalPages = MovieService.total_pages;
  let paginationItem = '';
  let activePage = '';
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 1) {
    paginationItem += `<li class="pagination__item">
        <span class="pagination__btn-minus" data-action="minus">
          &#10148;
        </span>
      </li>`;
  }

  if (page > 2) {
    paginationItem += `<li class="pagination__item"><span class="pagination__number" data-action="1">1</span></li>`;
    if (page > 3) {
      paginationItem += `<li class="pagination__item"><span class="pagination__dots" data-action="dots-minus">...</span></li>`;
    }
  }

  if (totalPages > 4) {
    if (page === totalPages) {
      beforePage = beforePage - 2;
    } else if (page === totalPages - 1) {
      beforePage = beforePage - 1;
    }
  }

  if (totalPages < 3 || totalPages > 4) {
    if (page === 1) {
      afterPage = afterPage + 2;
    } else if (page === 2) {
      afterPage = afterPage + 1;
    }
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
      <span class="pagination__btn-plus" data-action="plus">	
		&#10148;</span>
    </li>`;
  }

  paginationEl.innerHTML = paginationItem;
}

function changeCurrentPage(dataSet) {
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
}

export function getPageForLibrary(results) {
  const showCardMax = 20;
  const pageArr = [];

  for (let i = 0; i < results.length; i += showCardMax) {
    pageArr.push(results.slice(i, i + showCardMax));
  }

  MovieService.total_pages = pageArr.length;
  createPagination();

  return pageArr[page - 1];
}

async function onRenderGallery(event) {
  const dataSet = event.target.dataset.action;

  changeCurrentPage(dataSet);

  MovieService.changePage(page);

  try {
    if (!MovieService.library) {
      if (MovieService._query === '') {
        const { results } = await MovieService.getMovieTrend();
        renderMovieGallery(results);
        createPagination();
      } else {
        const { results } = await MovieService.getSearchMovieResult();
        renderMovieGallery(results);
        createPagination();
      }
    } else {
      if (queueBtn.classList.contains('is-active')) {
        showFilmList(false, 'queue');
        createPagination();
      } else if (watchBtn.classList.contains('is-active')) {
        showFilmList('watched', false);
        createPagination();
      } else if (recommendBtn.classList.contains('is-active')) {
        showRecomendedFilms();
        createPagination();
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
