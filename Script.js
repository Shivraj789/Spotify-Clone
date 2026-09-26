const songs = [

    {
        name: "Alag Aasmaan",
        artist: "Anuv Jain",
        song: "assets/song1.mp3",
        cover: "assets/alagAssman.jpg"
    },

    {
        name: "Gul",
        artist: "Anuv Jain",
        song: "assets/song2.mp3",
        cover: "assets/gul.jpg"
    },

    {
        name: "Baarishein",
        artist: "Anuv Jain",
        song: "assets/song3.mp3",
        cover: "assets/baarishein.jpg"
    }

];



// CURRENT SONG


let currentSong = 0;



// AUDIO OBJECT


const audio = new Audio();


// HTML ELEMENTS

const playBtn = document.querySelector(".play-btn");

const progressBar = document.querySelector(".progress-bar");

const volumeBar = document.querySelector(".volume-bar");

const songName = document.querySelector(".song-name");

const artistName = document.querySelector(".artist-name");

const albumImg = document.querySelector(".album-img");

const currentTime = document.querySelector(".current-time");

const totalTime = document.querySelector(".total-time");


// Get all player control icons

const controls = document.querySelectorAll(".player-control-icon");


// LOAD SONG

function loadSong(index) {

    currentSong = index;

    // Change audio
    audio.src = songs[currentSong].song;

    // Change song name
    songName.innerText = songs[currentSong].name;

    // Change artist
    artistName.innerText = songs[currentSong].artist;

    // Change album image
    albumImg.src = songs[currentSong].cover;

    // Reset progress
    progressBar.value = 0;

    // Reset timer
    currentTime.innerText = "0:00";

    // Reset total time
    totalTime.innerText = "0:00";
}



// PLAY SONG


function playSong() {

    audio.play();

    // Show pause icon
    playBtn.src = "assets/letsppause.jpeg";

}

function pauseSong() {

    audio.pause();

    // Show play icon
    playBtn.src = "assets/play_musicbar.png";

}



// PLAY / PAUSE BUTTON


playBtn.addEventListener("click", function () {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});



// NEXT SONG


// controls[3] = Next button

controls[3].addEventListener("click", function () {

    currentSong++;

    // If last song → go to first song
    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});



// PREVIOUS SONG


// controls[1] = Previous button

controls[1].addEventListener("click", function () {

    currentSong--;

    // If first song → go to last song
    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// ==========================================
// FORMAT TIME
// Example:
// 0 seconds   → 0:00
// 65 seconds  → 1:05
// 125 seconds → 2:05
// ==========================================

function formatTime(seconds) {

    let minutes = Math.floor(seconds / 60);

    let secs = Math.floor(seconds % 60);


    // Add 0 before seconds

    if (secs < 10) {

        secs = "0" + secs;

    }


    return minutes + ":" + secs;

}



// UPDATE CURRENT TIME + PROGRESS BAR


audio.addEventListener("timeupdate", function () {

    if (audio.duration) {

        // Calculate percentage

        let progress =
            (audio.currentTime / audio.duration) * 100;


        // Update progress bar

        progressBar.value = progress;


        // Update current timer

        currentTime.innerText =
            formatTime(audio.currentTime);

    }

});



// GET TOTAL SONG DURATION


audio.addEventListener("loadedmetadata", function () {

    if (audio.duration) {

        totalTime.innerText =
            formatTime(audio.duration);

    }

});



// SEEK SONG
// When user moves progress bar


progressBar.addEventListener("input", function () {

    if (audio.duration) {

        audio.currentTime =
            (progressBar.value / 100) * audio.duration;

    }

});



// VOLUME


// Set initial volume

volumeBar.min = 0;

volumeBar.max = 100;

volumeBar.value = 50;


// Set audio volume to 50%

audio.volume = 0.5;


// Change volume when slider moves

volumeBar.addEventListener("input", function () {

    audio.volume =
        volumeBar.value / 100;

});



// WHEN SONG ENDS
// AUTOMATICALLY PLAY NEXT SONG


audio.addEventListener("ended", function () {

    currentSong++;

    // If last song → first song

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});



// LOAD FIRST SONG WHEN PAGE OPENS


loadSong(0);