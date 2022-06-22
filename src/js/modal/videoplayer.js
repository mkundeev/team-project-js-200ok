import { forceLongPolling } from 'firebase/database';
import { refs } from '../service/refs';

// 2. This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;

function onYouTubeIframeAPIReady(key) {
  if (!player) {
    player = new YT.Player('player', {
      height: '460',
      width: '740',
      videoId: key,
      events: {
        onReady: onPlayerReady,
      },
    });
  } else {
    player.loadVideoById(key);
  }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function stopVideo() {
  player.stopVideo();
  refs.backdropMovie.classList.add('visually-hidden');
  refs.modalWindowBehind.classList.remove('visually-hidden');
  document.removeEventListener('keydown', closeEsc);
}

function videoPlay(ev) {
  ev.preventDefault();
  if (ev.target.classList.contains('play')) {
    onYouTubeIframeAPIReady(ev.target.dataset.src);
    refs.backdropMovie.classList.remove('visually-hidden');
    refs.modalWindowBehind.classList.add('visually-hidden');
    document.addEventListener('keydown', closeEsc);
  }
}

refs.cardModalMovie.addEventListener('click', videoPlay);
refs.backdropMovie.addEventListener('click', closeEmptyField);
refs.closeBtn.addEventListener('click', stopVideo);

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    stopVideo();
  }
}

function closeEmptyField(evt) {
  if (evt.target === evt.currentTarget) {
    stopVideo();
  }
}
