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
    console.log(player.videoId);
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
  console.log(player.getIframe());
  console.log(player.getVideoEmbedCode());
  // player.videoId = null;
  // console.log(player);
  refs.backdropMovie.classList.add('visually-hidden');
  refs.modalWindowBehind.classList.remove('visually-hidden');
  document.removeEventListener('keydown', closeEsc);
}

function videoPlay(ev) {
  ev.preventDefault();
  console.log(ev.target);
  if (ev.target.tagName === 'BUTTON') {
    onYouTubeIframeAPIReady(ev.target.dataset.src);
    console.log(player);
    console.log(ev.target.dataset.src);
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
