import { updateFilms, getFilms } from '../service/firebaseStorage'
import {renderMovieGallery} from '../template/renderMarkup'


let currentCardData={}

export const refs = {
    modalCard: document.querySelector('.modal__card'),
    watchBtn: document.querySelector('#watched'),
    queueBtn: document.querySelector('#queue'),
    deletQueueBtn: document.querySelector('#js-queue-delete'),  
}

refs.watchBtn.addEventListener('click',(e)=> showFilmList("watched",false))
refs.queueBtn.addEventListener('click', (e)=> showFilmList(false ,"queue"))
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

async function showFilmList(watched,queue) {
    refs.watchBtn.classList.toggle('is-active')
    refs.queueBtn.classList.toggle('is-active')
    watched? results = await getFilms(watched):results = await getFilms(queue)
    renderMovieGallery((Object.values(results)),watched,queue)
}

// async function showWatchedList() {
//     refs.watchBtn.classList.toggle('is-active')
//     refs.queueBtn.classList.toggle('is-active')
//     const results = await getFilms("watched")
//     renderMovieGallery((Object.values(results)),"watched",false)
// }
// async function showQueueList() {
//     refs.watchBtn.classList.toggle('is-active')
//     refs.queueBtn.classList.toggle('is-active')
//     const results = await getFilms("queue")
//     renderMovieGallery((Object.values(results)),false,"queue")
// }

export {getCurrentCardData, showFilmList}