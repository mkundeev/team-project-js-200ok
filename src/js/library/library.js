import { updateFilms, getFilms } from '../service/firebaseStorage'
import { renderMovieGallery } from '../template/renderMarkup'
import{refs as el} from '../service/refs'


let currentCardData = {}

let watchedFilmsArray = [];


export const refs = {
    modalCard: document.querySelector('.modal__card'),
    watchBtn: document.querySelector('#watched'),
    queueBtn: document.querySelector('#queue'),
    deletQueueBtn: document.querySelector('#js-queue-delete'),  
}

refs.watchBtn.addEventListener('click',(e)=> showFilmsOnClick("watched",false,e))
refs.queueBtn.addEventListener('click', (e)=> showFilmsOnClick(false ,"queue",e))
refs.modalCard.addEventListener('click', addFilmToDb)


function getCurrentCardData(data) {
    currentCardData = data;
}

function addFilmToDb(e) {
    e.preventDefault(e)
    if (e.target.classList.contains('js-watched-add'))
    {
     console.log(currentCardData)   
        updateFilms(currentCardData, "watched")
    } else
    if (e.target.classList.contains('js-queue-add'))
    {
     console.log(currentCardData)   
    updateFilms(currentCardData, "queue")}
}
function showFilmsOnClick(watched, queue, e) {
    showFilmList(watched, queue);
    changeActiveButton(e);
} 

async function showFilmList(watched,queue) {
    let results = [];
    try
   { watched ? results = await getFilms(watched) : results = await getFilms(queue);
        renderMovieGallery((Object.values(results)), watched, queue);
        
    }catch(error){
        console.log(error.message);
        el.movieContainer.innerHTML = '<li><p>There are no films in your library</p></li>'
    };
}
function changeActiveButton(e) {
    if (e.target === refs.watchBtn) {
        e.target.classList.add('is-active')
        refs.queueBtn.classList.remove('is-active')
    } else if (e.target === refs.queueBtn) {
        e.target.classList.add('is-active')
        refs.watchBtn.classList.remove('is-active')
   
    }
}

export {getCurrentCardData, showFilmList}