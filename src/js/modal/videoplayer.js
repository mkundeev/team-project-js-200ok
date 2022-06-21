import { forceLongPolling } from 'firebase/database';
import { refs } from '../service/refs';

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady(key) {
  console.log(key);
  if (!player) {
    player = new YT.Player('player', {
      height: '460',
      width: '740',
      videoId: key,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  } else {
    player.videoId = key;
  }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
  player.clearVideo();
  console.log(player);
  backdropMovie.classList.add('visually-hidden');
  modalWindowBehind.classList.remove('visually-hidden');
  document.removeEventListener('keydown', closeEsc);
}

function videoPlay(ev) {
  ev.preventDefault();
  console.log(ev.target);
  if (ev.target.tagName === 'BUTTON') {
    onYouTubeIframeAPIReady(ev.target.dataset.src);
    backdropMovie.classList.remove('visually-hidden');
    modalWindowBehind.classList.add('visually-hidden');
    document.addEventListener('keydown', closeEsc);
  }
}

const backdropMovie = document.querySelector('.movie-backdrop');
const closeBtn = document.querySelector('.video__close-icon');
const modalWindowBehind = document.querySelector('.modal__card');
const videoIframe = document.querySelector('#player');
refs.cardModalMovie.addEventListener('click', videoPlay);
backdropMovie.addEventListener('click', closeEmptyField);

closeBtn.addEventListener('click', stopVideo);

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
