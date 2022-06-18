import { refs } from '../service/refs';

export function renderMarkupCard(data) {
  refs.cardModalMovie.innerHTML = '';
  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
    id,
  } = data;

  const markup = `<img
        src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${poster_path}"
        alt="${title}"
        class="modal__img"
    />
      <div class="modal__info-container">
        <h2 class="modal__title-film">${title}</h2>
        <table class="modal__info">
          <tr>
            <td class="modal__info-category">Vote/Votes</td>
            <td class="modal__info-value">
              <span class="modal__vote">${vote_average}</span
              ><span class="modal__slash">/</span
              ><span class="modal__votes">${vote_count}</span>
            </td>
          </tr>
          <tr>
            <td class="modal__info-category">Popularity</td>
            <td class="modal__info-value">${popularity}</td>
          </tr>
          <tr>
            <td class="modal__info-category">Original Title</td>
            <td class="modal__info-value">${original_title}</td>
          </tr>
          <tr>
            <td class="modal__info-category">Genre</td>
            <td class="modal__info-value">${genres
              .map(item => item.name)
              .join(', ')}</td>
          </tr>
        </table>
        <p class="modal__title-about">About</p>
        <p class="modal__article-about-movie">
          ${overview}
        </p>
        <div class="modal__button-container">
          <button type="submit" class="modal__button" id="auth-delete-js" data-id=${id}>
            ADD TO WATCHED
          </button>
          <button type="submit" class="modal__button" id="auth-add-js" data-id=${id}>
            ADD TO QUEUE
          </button>
        </div>
        <div class="modal__button-container">
          <button type="submit" class="modal__button" id="auth-delete-js" data-id=${id}>
            ADD TO WATCHED
          </button>
          <button type="submit" class="modal__button" id="auth-add-js" data-id=${id}>
            ADD TO QUEUE
          </button>
        </div>
      </div>`;
  refs.cardModalMovie.insertAdjacentHTML('beforeend', markup);
}
