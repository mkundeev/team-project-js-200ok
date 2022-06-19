import { updateFilms, getFilms } from '../service/firebaseStorage'
import {renderMovieGallery} from '../template/renderMarkup'


let currentCardData={}

export const refs = {
    modalCard: document.querySelector('.modal__card'),
    watchBtn: document.querySelector('#watched'),
    queueBtn: document.querySelector('#queue'),
    deletQueueBtn: document.querySelector('#js-queue-delete'),  
}

refs.watchBtn.addEventListener('click', showWatchedList)
refs.queueBtn.addEventListener('click', showQueueList)
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

async function showWatchedList() {
    const results = await getFilms("watched")
    renderMovieGallery((Object.values(results)),"watched",false)
}
async function showQueueList() {
    const results = await getFilms("queue")
    renderMovieGallery((Object.values(results)),false,"queue")
}






export {getCurrentCardData}