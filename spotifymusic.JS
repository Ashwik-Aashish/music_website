document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const playIcons = document.querySelectorAll('.playIcon');
    const posterPlayHandle = document.getElementById('poster_play_handle');
    const titleElement = document.getElementById('title');
    const waveElements = document.querySelectorAll('.waves');
    const playButton = document.querySelector('.bi-play');
    let masterPlay = document.getElementById('masterPlay');
    let wave = document.getElementById('wave');
    let currentStart = document.getElementById('currentTime'); 
    let currentEnd = document.getElementById('EndTime');
    let seekBar = document.getElementById('seek');
    let bar2 = document.getElementById('bar2');
    let dot = document.querySelector('.bar .dot');
    const volInput = document.getElementById('vol');
    const volIcon = document.getElementById('vol_icon');
    let vol_bar = document.getElementsByClassName('vol_bar')[0];
    let vol_dot = document.getElementById('vol_dot');
    const skipStartButton = document.querySelector('.bi-skip-start');
    const skipEndButton = document.querySelector('.bi-skip-end');
    const downloadButton = document.getElementById('download_song');

    const songs = [
        { title: "Fein", artist: "Travis Scott", image: "Images/1Img.jpeg", musicSrc: "music/1.mp3" },
        { title: "Blinding Lights", artist: "The Weeknd", image: "Images/2.jpeg", musicSrc: "music/2.mp3" },
        { title: "Shape of You", artist: "Ed Sheeran", image: "Images/3.jpeg", musicSrc: "music/3.mp3" },
        { title: "Someone You Loved", artist: "Lewis Capaldi", image: "Images/4.jpeg", musicSrc: "music/4.mp3" },
        { title: "Sunflower", artist: "Post Malone & Swae Lee", image: "Images/5.jpeg", musicSrc: "music/5.mp3" },
        { title: "As It Was", artist: "Harry Styles", image: "Images/6.jpeg", musicSrc: "music/6.mp3" },
        { title: "Starboy", artist: "The Weeknd ft. Daft Punk", image: "Images/7.jpeg", musicSrc: "music/7.mp3" },
        { title: "One Dance", artist: "Drake ft. Wizkid & Kyla", image: "Images/8.jpeg", musicSrc: "music/8.mp3" },
        { title: "Stay", artist: "The Kid Laroi & Justin Bieber", image: "Images/9.jpeg", musicSrc: "music/9.mp3" },
        { title: "Dance Monkey", artist: "Tones And I", image: "Images/10.jpeg", musicSrc: "music/10.mp3" },
        { title: "Believer", artist: "Imagine Dragons", image: "Images/11.jpeg", musicSrc: "music/11.mp3" },
        { title: "Heat Waves", artist: "Glass Animals", image: "Images/12.jpeg", musicSrc: "music/12.mp3" }
    ];

    let currentSongIndex = 0;

    function updateVolume() {
        let volume = volInput.value / 100;
        audioPlayer.volume = volume;

        // Update volume icon based on volume level
        if (volume === 0) {
            volIcon.classList.remove('bi-volume-up', 'bi-volume-down');
            volIcon.classList.add('bi-volume-mute');
        } else if (volume > 0 && volume <= 0.5) {
            volIcon.classList.remove('bi-volume-up', 'bi-volume-mute');
            volIcon.classList.add('bi-volume-down');
        } else {
            volIcon.classList.remove('bi-volume-down', 'bi-volume-mute');
            volIcon.classList.add('bi-volume-up');
            alert('High volume on earphone can damage ears');
        }
        
        // Update the visual representation of the volume slider
        let volPercent = volInput.value;
        vol_bar.style.width = `${volPercent}%`;
        vol_dot.style.left = `${volPercent}%`;
    }

    // Initialize volume based on current volume of the audio player
    volInput.value = audioPlayer.volume * 100;
    updateVolume();

    // Event listener for volume input change
    volInput.addEventListener('input', updateVolume);

    function updatePlayPauseIcons(isPlaying) {
        if (isPlaying) {
            playButton.classList.add('bi-pause');
            playButton.classList.remove('bi-play');
            masterPlay.classList.add('bi-pause');
            masterPlay.classList.remove('bi-play');
            wave.classList.add('active1');
        } else {
            playButton.classList.remove('bi-pause');
            playButton.classList.add('bi-play');
            masterPlay.classList.remove('bi-pause');
            masterPlay.classList.add('bi-play');
            wave.classList.remove('active1');
        }
    }

    function updateTime() {
        let music_cur = audioPlayer.currentTime;
        let music_dur = audioPlayer.duration;

        let min1 = Math.floor(music_dur / 60);
        let sec1 = Math.floor(music_dur % 60);
        if (sec1 < 10) sec1 = `0${sec1}`;
        
        if (!isNaN(min1) && !isNaN(sec1)) {
            currentEnd.innerText = `${min1}:${sec1}`;
        }

        let min2 = Math.floor(music_cur / 60);
        let sec2 = Math.floor(music_cur % 60);
        if (sec2 < 10) sec2 = `0${sec2}`;

        currentStart.innerText = `${min2}:${sec2}`;

        // Update the progress bar and the dot
        let progress = (music_cur / music_dur) * 100;
        seekBar.value = progress;
        bar2.style.width = `${progress}%`;
        dot.style.left = `${progress}%`;
    }

    function loadSong(index) {
        const song = songs[index];
        audioSource.src = song.musicSrc;
        posterPlayHandle.src = song.image;
        titleElement.innerHTML = `${song.title} <div class="subtitle"> ${song.artist} </div>`;
        audioPlayer.load();
        audioPlayer.play();
        updatePlayPauseIcons(true);
    }

    function skipToPrevious() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    }

    function skipToNext() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    }

    function downloadSong() {
        const song = songs[currentSongIndex];
        const link = document.createElement('a');
        link.href = song.musicSrc;
        link.download = `${song.title} - ${song.artist}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    playIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            currentSongIndex = index;
            loadSong(currentSongIndex);
        });
    });

    masterPlay.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            updatePlayPauseIcons(true);
        } else {
            audioPlayer.pause();
            updatePlayPauseIcons(false);
        }
    });

    skipStartButton.addEventListener('click', skipToPrevious);
    skipEndButton.addEventListener('click', skipToNext);
    downloadButton.addEventListener('click', downloadSong);

    audioPlayer.addEventListener('timeupdate', updateTime);
    audioPlayer.addEventListener('loadedmetadata', updateTime);

    seekBar.addEventListener('input', function() {
        audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
    });

    // Additional debugging to check event listeners
    audioPlayer.addEventListener('play', () => {
        console.log('Audio is playing');
    });

    audioPlayer.addEventListener('pause', () => {
        console.log('Audio is paused');
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        console.log('Metadata loaded');
        updateTime(); // Ensure time is updated when metadata is loaded
    });

    audioPlayer.addEventListener('timeupdate', () => {
        console.log('Current time: ', audioPlayer.currentTime);
    });
});


// music.addEventListener('timeupdate', () => {
//            let music_cur = music.currentTime;
//            let music_dur = music.duration;

//            let min1 = Math.floor(music_dur / 60);
//            let sec1 = Math.floor(music_dur % 60);

//            currentEnd.innerText = `${min1} : ${sec1}`;

// })

// masterPlay.addEventListener('click' , () => {
//        if(music.paused || music.currentTime <= 0){
//         music.play();
//         wave.classList.add('active1');
//         masterPlay.classList.remove('bi-play');
//         masterPlay.classList.add('bi-pause') ;
//        } else {
//         music.pause();
//         wave.classList.remove('active1');
//         masterPlay.classList.add('bi-play');
//         masterPlay.classList.remove('bi-pause') ;
//        }
// })


//     pauseButton.addEventListener('click', function() {
//         audioPlayer.pause();
//         waveElements.forEach(wave => {
//             wave.style.animation = 'none';
//         });
//     }); 

//     // Update play handle when audio ends
//     audioPlayer.addEventListener('ended', function() {
//         waveElements.forEach(wave => {
//             wave.style.animation = 'none';
//         });
//     });
// });



let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];

let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let items = document.getElementsByClassName('items')[0];

pop_song_right.addEventListener('click', () => {
   pop_song.scrollLeft += 330;
});

pop_song_left.addEventListener('click', () => {
   pop_song.scrollLeft -= 330;
});

pop_art_right.addEventListener('click', () => {
    items.scrollLeft += 330;
});

pop_art_left.addEventListener('click', () => {
    items.scrollLeft -= 330;
});
