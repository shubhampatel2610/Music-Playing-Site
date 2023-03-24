var songIndex = 0;
var audioElement = new Audio("songs/song1.mp3");
var masterPlay = document.getElementById("masterPlay");
var progressBar = document.getElementById("progressBar");
var masterSongName = document.getElementById("masterSongName");
var gif = document.getElementById("gif");
var songItems = Array.from(document.getElementsByClassName("songItem"));
var currentSong = document.getElementsByClassName("songItemPlay");

var songs = [{
        songName: "Demon Slayer Opening",
        filePath: "songs/song1.mp3",
        coverPath: "images/DemonSlayer.jpg"
    },
    {
        songName: "Kamado Tanjirou No Uta",
        filePath: "songs/song1.mp3",
        coverPath: "images/DemonSlayer.jpg"
    },
    {
        songName: "Death Note L Theme",
        filePath: "songs/song1.mp3",
        coverPath: "images/DeathNote.jpg"
    },
    {
        songName: "Naruto Main Theme",
        filePath: "songs/song1.mp3",
        coverPath: "images/Naruto.jpg"
    },
    {
        songName: "Naruto Sadness And Sorrow",
        filePath: "songs/song1.mp3",
        coverPath: "images/Naruto.jpg"
    },
    {
        songName: "Bleach Eternal Raijin - La Espada",
        filePath: "songs/song1.mp3",
        coverPath: "images/Bleach.jpg"
    },
    {
        songName: "Your name - スパークル",
        filePath: "songs/song1.mp3",
        coverPath: "images/YourName.jpg"
    },
]

songItems.forEach(function (element, i) {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//Handle play pause
masterPlay.addEventListener("click", function () {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
    }
});

//Listen events
audioElement.addEventListener("timeupdate", function () {
    var progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

progressBar.addEventListener("change", function () {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

function makeAllPlays() {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(function (element) {
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    });
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach(function (element) {
    element.addEventListener("click", function (e) {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-pause");
            audioElement.src = "songs/song" + songIndex + ".mp3";
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.play();
            gif.style.opacity = 1;

        } else {
            audioElement.pause();
            e.target.classList.remove("fa-pause");
            e.target.classList.add("fa-play");
            gif.style.opacity = 0;
        }

    });


});



document.getElementById("next").addEventListener("click", function () {
    if (songIndex >= 6) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = "songs/song" + songIndex + ".mp3";
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});

document.getElementById("previous").addEventListener("click", function () {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = "songs/song" + songIndex + ".mp3";
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});