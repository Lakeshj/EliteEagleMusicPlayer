// object for Songs Data

const songs = [
    {
        name: 'happier',
        title: 'happier',
        artist: 'hap'
    },
    {
        name: 'despacito_piano',
        title: 'despacito_piano',
        artist: 'desp'
    },
    {
        name: 'Mitra Re Runway 34',
        title: 'Mitra Re',
        artist: 'Arjeet Singh & Jalseen Royal'
    },
    {
        name: 'Shaadi Karke Le Jayega Mujhe',
        title: 'Shaadi Karke Le',
        artist: 'Miling Gaba'
    }
];


// for getting the references

const title = document.getElementById('title');
const artist = document.getElementById('artist');
const image = document.getElementById('songImg');

const audio = document.getElementById('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const ProgressBar = document.getElementById('progrssBar');
const bar = document.getElementById('bar');
const VolDot = document.getElementById('volDot');
const volonoff = document.getElementById('volonoff');

const volumeContainer = document.querySelector('.volumeContainer');
const VolumeControl = document.getElementById('VolumeControl');

const current_time = document.querySelector('.current_time');
const Total_duration = document.querySelector('.Total_duration');


let isplay = false;
let counter = 0;
const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    image.src = `./src/image/${songs.name}.png`;
    audio.src = `./src/music/${songs.name}.mp3`;
}
loadSong(songs[0]);


// for playing songs functionality
const playsong = () => {
    isplay = true;
    image.classList.add('anime');
    playBtn.classList.replace('fa-play', 'fa-pause');
    audio.play();
    audio.volume = 0.15;
};

// for pause songs functionality
const pausesong = () => {
    isplay =false;
    image.classList.remove('anime');
    playBtn.classList.replace('fa-pause', 'fa-play');
    audio.pause();
};

// play button event
playBtn.addEventListener('click', () => {
    isplay ? pausesong() : playsong() ;
});

// next button 
const nextSong = () => {
    count = ( counter + 1 ) % songs.length;
    loadSong(songs[count]);
    counter++;
    playsong();    
};

// for previous button
const prevSong = () => {
    counter = ( counter - 1 + songs.length ) % songs.length;
    loadSong(songs[counter]);
    playsong();    
};

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// progress bar event with timing 
audio.addEventListener('timeupdate', (TimeEvnt) => {
    let { currentTime, duration } = TimeEvnt.srcElement;
    let TotalTime = ( currentTime / duration ) * 100;
    bar.style.width = `${TotalTime}%`

    // for Timing Of Songs Duration time
    let Min_Duration = Math.floor( duration / 60 );
    let Sec_Duration = Math.floor( duration % 60 );
    if(Min_Duration < 10){
        Min_Duration = ` 0${ Min_Duration }`;
    };
    if(Sec_Duration < 10) {
        Sec_Duration = `0${ Sec_Duration }`;
    };
    if (duration) {
        Total_duration.textContent = ` ${ Min_Duration } : ${ Sec_Duration }`;
    };

    // for Timing Of Songs Current Time
    let Min_currentTime = Math.floor( currentTime / 60 );
    let Sec_currentTime = Math.floor( currentTime % 60 );
    if(Min_currentTime < 10){
        Min_currentTime = ` 0${ Min_currentTime }`;
    };
    
    if(Sec_currentTime < 10){
        Sec_currentTime = ` 0${ Sec_currentTime }`;
    };
    current_time.textContent =  ` ${ Min_currentTime} : ${ Sec_currentTime }`;
});

// progress bar Event
ProgressBar.addEventListener('click', (barEvent) => {
    let CurrBarWidth = barEvent.offsetX;
    let TotalBarWidth = barEvent.srcElement.clientWidth;
    const {duration} = audio;
    let Total_Width = ( CurrBarWidth / TotalBarWidth ) * duration
    audio.currentTime = Total_Width;
});

audio.addEventListener('ended' , nextSong);

volumeContainer.addEventListener('mouseenter', () => {
   VolumeControl.classList.add('VolumeControl');
   volumeContainer.style.transform = `scale(${0, 1.051})`;
   VolDot.classList.add('VolDot');
});
volumeContainer.addEventListener('mouseleave', () => {
    VolumeControl.classList.remove('VolumeControl');
    VolDot.classList.remove('VolDot');
    volumeContainer.style.transform = `scale(${0, 1})`;
});

// for mute and Unmute Volume Button
let ismute = false;
const muteVol = () => {
    ismute = true;
    volonoff.classList.replace('fa-volume-up','fa-volume-mute');
    // VolDot.classList.add('disable');
    audio.muted = true;

    // for disable function after mute
    VolumeControl.style.opacity = '0.5';
    VolumeControl.classList.add('disable');
};
const unmuteVol = () => {
    ismute = false;
    volonoff.classList.replace('fa-volume-mute', 'fa-volume-up');
    audio.muted = false;

    // for Enable function after mute
    VolumeControl.style.opacity = '1';
    VolumeControl.classList.remove('disable');
};

volonoff.addEventListener('click', () =>{
    ismute ? unmuteVol() : muteVol();
});

// for controling of volume Level
VolumeControl.addEventListener('click', (VolEvnt) => {
    let LevelHeight = VolEvnt.offsetY;
    let LevelTotHeight = VolEvnt.srcElement.clientHeight;
    let TotalLevel = ( LevelHeight / LevelTotHeight ) ;
    VolDot.style.top = `${TotalLevel * 100 }%`
    audio.volume = `${TotalLevel}`;
});

