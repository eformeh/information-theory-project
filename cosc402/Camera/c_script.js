
let recorderBtn = document.querySelector("#recorder");
let timmer = document.querySelector("#timer");
let time = document.querySelector("#recTime");
let backBtn = document.querySelector("#back");
let galleryBtn = document.querySelector("#gallery");


let popMsg = document.querySelector("#popUpMsg");
let popwindow = document.querySelector("#popup_window");
let textBox = document.querySelector("#textBox");
let enterBtn = document.querySelector(".enter");


let buffer = [];
let clearObj;
let zoomLevel = 1;
let mediaRecorder;
let recordState = false;
let constraints = {
    video: true,
    audio: true
}

backBtn.addEventListener("click", function () {
    window.location.assign("../index.html")
})
galleryBtn.addEventListener("click", function () {
    window.location.assign("../Gallery/g_index.html")
})

navigator.mediaDevices.getUserMedia(constraints)
    .then(function (mediaStream) {
        videoBox.srcObject = mediaStream;
        let mediaStreamTrack = mediaStream.getVideoTracks()[0];


        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.addEventListener("dataavailable", function (e) {
            buffer.push(e.data);
        })
        mediaRecorder.addEventListener("stop", function () {
            popwindow.classList.add("show");
            popUpMsg();
            popUpWindow("video")
        })
    })
    .catch(function (err) {
        console.log(err)
    });



recorderBtn.addEventListener("click", function () {
    if (recordState == false) {
        mediaRecorder.start();
        recorderBtn.classList.add("activeBtn");
        recorderBtn.classList.add("record_animation");
        startTimer();
        recordState = true;
    } else {
        mediaRecorder.stop();
        recorderBtn.classList.remove("activeBtn");
        recorderBtn.classList.remove("record_animation");
        videoBox.classList.add("blink");
        setTimeout(function () {
            videoBox.classList.remove("blink");
        }, 200);
        stopTimer();
        recordState = false;
    }
})

function startTimer() {
    timmer.classList.add("timerActive");
    let timeCount = 0;
    clearObj = setInterval(function () {
        let seconds = (timeCount % 60) < 10 ? `0${timeCount % 60}` : `${timeCount % 60}`;
        let minutes = (timeCount / 60) < 10 ? `0${Number.parseInt(timeCount / 60)}` : `${Number.parseInt(timeCount % 60)}`;
        let hours = (timeCount / 3600) < 10 ? `0${Number.parseInt(timeCount / 3600)}` : `${Number.parseInt(timeCount % 60)}`;
        time.innerText = `${hours}:${minutes}:${seconds}`;
        timeCount++;
    }, 1000)
}
function stopTimer() {
    timmer.classList.remove("timerActive");
    time.innerText = "00:00:00";
    clearInterval(clearObj);
}

function findDate() {
    let date = new Date();
    let str = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    return str;
}

function popUpMsg() {
    popMsg.className = "show";
    setTimeout(function () { popMsg.className = popMsg.className.replace("show", ""); }, 2000);
}

function popUpWindow(type, canvas) {
    enterBtn.addEventListener("click", function () {
        let mediaName = textBox.innerText;
        let date = findDate();
        if (type === "camera") {
            let link = canvas.toDataURL();
            addMedia(link, "img", mediaName, date);
        }
        else {
            let blob = new Blob(buffer, { type: 'video/mp4' });
            addMedia(blob, "video", mediaName, date);
            buffer = [];
        }
        videoBox.classList.remove("blink");
        popwindow.classList.remove("show");
    })
}

