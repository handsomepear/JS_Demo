// 获取节点
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// 点击播放或者暂停
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

// 点击video图标的更新
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
    }else{
        play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
    }
}

// 点击video更新进度条和时间戳
function updateProgress(){
    // video.currentTime为当前时间，video.duration为视频的总时间
    progress.value = video.currentTime / video.duration * 100;

    //获取分钟数
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + mins;
    }

    //获取秒数
    let seconds = Math.floor(video.currentTime % 60);
    if(seconds < 10){
        seconds = '0' + seconds;
    }

    timestamp.innerHTML = `${mins}:${seconds}`;
}

// 停止视频
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

// 改变进度条的时候更改播放内容和时间戳
function setVideoProgress(e){
    e.stopPropagation();
    video.currentTime = +progress.value / 100 * video.duration;
}

// 添加事件
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
