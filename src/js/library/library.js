import { updateFilms, getFilms, updateRecommendFilms, getRecomendedFilms, deletFilm } from '../service/firebaseStorage';
import { renderMovieGallery, renderSearchResultMovie, renderOneFilm } from '../template/renderMarkup';
import { refs } from '../service/refs';
import { getPageForLibrary } from '../template/pagination';
import { MovieService } from '../service/fetchItems';
import { spinner } from '../spinner/spinner';
import { addSelector } from '../display-results/display-results';



//==========информация про текущий просматриваемый филм==============
let currentCardData = {};
//==========переменная для идентификатора филма по которому будет делаться запрос на рекомендованные филмы(последний фильм добавленный в очередь)==============
let recommendId = null;


refs.watchBtn.addEventListener('click', showWatchedFilms);
refs.queueBtn.addEventListener('click', showQueueFilms);
refs.recommendBtn.addEventListener('click', showRecomendedFilmsAndReplacePage);


function getCurrentCardData(data) {
  currentCardData = data;
}

function getRecommendId(id) {
   recommendId=id
}

//=========переключение кнопок библиотеки==============
function toggleLibraryBtns(e) {
  refs.libraryBtns.forEach(btn=>btn.classList.remove('is-active'))
  e.target.classList.add('is-active')
}

//=========отображение фильмов в разделе watched==============
function showWatchedFilms(e) {
  toggleLibraryBtns(e)
  MovieService.changePage(1);
   showFilmList('watched', false);
}
//=========отображение фильмов в разделе queue==============
function showQueueFilms(e) {
  toggleLibraryBtns(e)
  MovieService.changePage(1);
  showFilmList(false, 'queue');
}
//=========отображение фильмов в разделе recommend==============
function showRecomendedFilmsAndReplacePage(e) {
  toggleLibraryBtns(e)
  MovieService.changePage(1);
  showRecomendedFilms();
}

async function showRecomendedFilms(e) {
  
 //=========если есть фильм добавленный в очеред просмотров============== 
  if (recommendId) {

    spinner.show()
    const results = await MovieService.getRecommendMovies(recommendId);
    updateRecommendFilms(results);
    renderSearchResultMovie(results);
    spinner.hide()

  }
  //=========если нет фильма добавленого в очеред просмотров, отображаеться ранее сохраненный список рекомендованих фильмов============== 
  else{
    spinner.show()
    try {
      const results = await getRecomendedFilms();
        MovieService.total_pages = Math.ceil(results.length / 20);
      renderSearchResultMovie(results);
  } catch (error) {
    console.log(error.message);
    refs.movieContainer.innerHTML =
      '<li><p>There are no recommend films</p></li>';
  }spinner.hide()
  } 
}
//=========создание галереи фильмов==============
async function showFilmList(watched, queue) {
  let results = [];
  spinner.show()
  try {
    if (watched) {
      results = await getFilms(watched);
    }
    if (queue) {
      results = await getFilms(queue);
    }

    results = Object.values(results);
    results = results.map(result => ({
      ...result,
      genre_ids: result.genres.map(({ name }) => name).join(', '),
    }));
    renderMovieGallery(getPageForLibrary(results), watched, queue);
  } catch (error) {
    console.log(error.message);
    refs.movieContainer.innerHTML =
      '<li><p>There are no films in your library</p></li>';
  }
  spinner.hide()
}


//=========удаляет карточку фильма из галереи соответсвующтх фильмов и из бази данних==============
async function delFromList(e, src, userId) {
  userId && addSelector(e);
  const id = e.target.dataset.id;
  deletFilm(id, src);
  if(src==='watched' && refs.watchBtn.classList.contains('is-active') || src==='queue' && refs.queueBtn.classList.contains('is-active'))
 { if(refs.libraryLinkEl.classList.contains('site-nav__link-current'))
  {refs.movieContainer.querySelector(`[data-id="${id}"]`).remove();}

  }
};
//=========добавляет фильм в галерею соответсвующих фильмов и в базу данних==============  
async function addFilmToList(e, src, userId) {
  userId && addSelector(e)
  addFilmToDb(e)
  if(src==='watched' && refs.watchBtn.classList.contains('is-active') || src==='queue' && refs.queueBtn.classList.contains('is-active'))
 { const id = e.target.dataset.id;
  const result = await MovieService.getSearchMovieById(id);
  const markup = renderOneFilm(result)
  refs.movieContainer.insertAdjacentHTML("beforeend", markup )}
}

//=========добавляет фильм в базу данних ==============
function addFilmToDb(e) {
  e.preventDefault();
  if (e.target.classList.contains('js-watched-add')) {
    updateFilms(currentCardData, 'watched');
  } else if (e.target.classList.contains('js-queue-add')) {
    updateFilms(currentCardData, 'queue'); 
  } 
}


export { getCurrentCardData, showFilmList, getRecommendId, addFilmToDb, delFromList, addFilmToList, showRecomendedFilms };
