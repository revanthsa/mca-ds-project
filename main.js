var dummyURLS = [
    'https://pwdown.com/9043/16%20Mast%20Magan%20-%202%20States%20(Arijit%20Singh).mp3',
    'https://pwdown.com/113506/Romantic%20Mashup%202021%20Ringtone.mp3',
    'https://pwdown.com/113558/Ranjha%20-%20Shershaah.mp3',
    'https://pwdown.com/12075/Kabira%20-%20Arijit%20Singh%20-%20320Kbps.mp3',
]

var songIndex = 0;
var myPlaylist = [
    {
        name: 'Romantic Mashup',
        url: 'https://pwdown.com/113506/Romantic%20Mashup%202021%20Ringtone.mp3',
    },
];

function displayPlaylist() {
    $('#songs').empty();
    $.each(myPlaylist, function (index) {
        sno = index + 1;
        $('#songs').append('<div>' + sno + '. ' + myPlaylist[index].name + '</div>');
    });
}

displayPlaylist();

document.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var ind = myPlaylist.length;
    const obj = { name: formData.get("musicNameid"), url: formData.get("musicURLid") };
    myPlaylist.push(obj);
    displayPlaylist();
    $('#modal').modal('hide');
    document.querySelector('form').reset();
    nextSong();
});

const musicPlayer = document.getElementById('music-player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('music-name');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const audio = document.getElementById('currently-playing');
const currTime = document.getElementById('currTime');
const durTime = document.getElementById('durTime');

function loadSong(name, url) {
    title.innerText = name;
    audio.src = url;
}

function playSong() {
    musicPlayer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicPlayer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    songIndex--;
    songIndex = (songIndex < 0) ? (Object.keys(myPlaylist).length - 1) : songIndex;
    let name = myPlaylist[songIndex].name;
    let url = myPlaylist[songIndex].url;
    loadSong(name, url);
    playSong();
}

function nextSong() {
    songIndex++;
    songIndex = (songIndex > (Object.keys(myPlaylist).length - 1)) ? 0 : songIndex;
    let name = myPlaylist[songIndex].name;
    let url = myPlaylist[songIndex].url;
    loadSong(name, url);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function DurTime(e) {
    const { duration, currentTime } = e.srcElement;
    var sec;
    var sec_d;

    // define minutes currentTime
    let min = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;

    // define seconds currentTime
    function get_sec(x) {
        if (Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }

    get_sec(currentTime, sec);

    // change currentTime DOM
    currTime.innerHTML = min + ':' + sec;

    // define minutes duration
    let min_d = (isNaN(duration) === true) ? '0' : Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;


    function get_sec_d(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true) ? '0' :
                Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
    }

    // define seconds duration
    get_sec_d(duration);

    // change duration DOM
    durTime.innerHTML = min_d + ':' + sec_d;

};

playBtn.addEventListener('click', () => {
    const isPlaying = musicPlayer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});


prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', DurTime);
