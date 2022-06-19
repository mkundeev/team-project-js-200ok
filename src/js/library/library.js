import {updateFilms, getFilms} from '../service/firebaseStorage'


let currentCardData={}

export const refs = {
    modalCard: document.querySelector('.modal__card'),
    addWatchBtn: document.querySelector('#js-watched-add'),
    delWatchBtn: document.querySelector('#js-watched-delete'),
    addQueueBtn: document.querySelector('#js-queue-add'),
    deletQueueBtn: document.querySelector('#js-queue-delete'),
     
}

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
// function addFilmToQueue(e) {
//     e.preventDefault(e)
//     if (e.target.classList.contains('js-watched-add'))
//     {
//      console.log(currentCardData)   
//     // renderLibraryMarkup(currentCardData)
//     updateFilms(currentCardData, "watched")}
// }

const test = document.querySelector('.test')
test.addEventListener('click', getWatchedFilmFromDb)

async function getWatchedFilmFromDb() {
    getFilms("queue").then((result)=>console.log(result))
}


export {getCurrentCardData}