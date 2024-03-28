const video = document.getElementById("video");
const playPauseBtn = document.getElementById("pause");
const backwardBtn = document.getElementById("backward");
const forwardBtn = document.getElementById("forward");
const volumeBtn = document.getElementById("volume");
const volumeRange = document.getElementById("volume-range");
const progressBar = document.getElementById("progress-bar");
const image = document.getElementById('pause');
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");


playPauseBtn.addEventListener('click',togglePlayPause);
backwardBtn.addEventListener('click',skipBack);
forwardBtn.addEventListener('click',skipForward);
volumeBtn.addEventListener('click',volumeControl);
volumeRange.addEventListener('input',volumeRangeControl);

function togglePlayPause(){
    if (video.paused) {
        video.play();
        playPauseBtn.src = "./icons/pause-solid.svg";
      } else {
        video.pause();
        playPauseBtn.src = "./icons/play-solid.svg";
      }
}

function skipBack(){
   video.currentTime -= 15;
}

function skipForward(){
    video.currentTime += 15;
}

function volumeControl(){
    video.muted = !video.muted;
    if(video.muted){
        volumeBtn.src ="./icons/volume-xmark-solid.svg";
    }else{
        volumeBtn.src ="./icons/volume-solid.svg";
    }
}

function volumeRangeControl(){
    video.volume = volumeRange.value /100;
    if(video.muted){
        video.muted = false;
        volumeBtn.src = "./icons/volume-solid.svg"
    }
}


video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const progress = (currentTime / duration) * 100;

  progressBar.style.width = `${progress}%`;

  currentTimeDisplay.textContent = formatTime(currentTime);
  durationDisplay.textContent = formatTime(duration - currentTime);
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};


