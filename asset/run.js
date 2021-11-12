const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const playList = $(".playlist");
const cd = $(".cd");
const cdThumb = $(".cd-thumb");
const playBtn = $(".btn-toggle-play");
const audio = $('#audio');
const nextBtn = $(".btn-next");
const prevBtn = $('.btn-prev');
const ramdomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const progress = $('#progress');


const heading = $('header h2');
const App = {
    currentIndex: 0,
    isPlaying: false,
    isRamdom: false,
    isReapeat: false,
    songs: [{
            name: "Easy On Me",
            singer: "Adele",
            path: "./asset/music/EasyOnMe.mp3",
            image: "https://i2.wp.com/medianub.com/wp-content/uploads/2021/11/Adele-Easy-On-Me.jpeg?fit=695%2C441&ssl=1"
        }, {
            name: "East Of Eden",
            singer: "Zella Day",
            path: "./asset/music/EastOfEden.mp3",
            image: "https://data.chiasenhac.com/data/cover/43/42035.jpg"
        }, {
            name: "Walk Thru Fire",
            singer: "Vicetone ft Meron Ryan",
            path: "./asset/music/WalkThruFire.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2018/08/06/f/5/6/1/1533518669570_640.jpg"
        }, {
            name: 'See You Again',
            singer: 'Charlie Puth ft Wiz Khalifa',
            path: './asset/music/SeeYouAgain.mp3',
            image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
        },
        {
            name: "Unstoppable",
            singer: "Sia",
            path: "./asset/music/Unstoppable.mp3",
            image: "https://mp3how.com/wp-content/uploads/2021/08/download-2.jpeg"
        }, {
            name: "Halo",
            singer: "Beyonce",
            path: "./asset/music/Halo.mp3",
            image: "https://i1.wp.com/winnaijatv.com/wp-content/uploads/2021/08/Beyonce-Halo-DOWNLOAD-MP3.jpg?resize=708%2C708&ssl=1"
        },
        {
            name: 'Symphony',
            singer: 'Clean Bandit',
            path: './asset/music/Symphony.mp3',
            image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
        }, {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: './asset/music/WaitingForLove.mp3',
            image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
        }, {
            name: 'Alone',
            singer: 'Marshmello',
            path: './asset/music/Alone.mp3',
            image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
        }, {
            name: 'Something Just Like This',
            singer: 'The Chainsmokers & Coldplay',
            path: './asset/music/SomethingJustLikeThis.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        }, {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: './asset/music/Sugar.mp3',
            image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
        },

    ],
    render: function() {
        const htmls = this.songs.map((item, index) => {
            return `
            <div data-index="${index}" class="song ${
                index === this.currentIndex ? 'active' : ''
            }">   
                <div 
                   class="thumb" 
                   style="background-image: url('${item.image}');
                "></div>
                <div class="body">
                  <h3 class="title">${item.name}</h3>
                  <p class="author">${item.singer}</p>
                </div>
                <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>

             `;
        });
        playList.innerHTML = htmls.join('');

    },
    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;


        // cd quay
        const cdThumbAnimation = cdThumb.animate([{
            transform: "rotate(360deg)",
        }], {
            duration: 10000,
            iterations: Infinity,
        });
        cdThumbAnimation.pause();

        // phong to thu nho cd
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        //  xu li play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

        }

        //  xu li nextBtn
        nextBtn.onclick = function() {
                if (_this.isRamdom) {
                    _this.randomSong();
                } else {
                    _this.nextSong();
                }
                _this.scrollToActiveSong();
                audio.play();
            }
            // xu li prevBtn 
        prevBtn.onclick = function() {
                if (_this.isRamdom) {
                    _this.randomSong();
                } else {
                    _this.prevSong();
                }
                _this.scrollToActiveSong();
                audio.play();
            }
            //  xu li randomBtn
        ramdomBtn.onclick = function() {
                if (!_this.isRamdom) {
                    _this.isRamdom = true;
                    ramdomBtn.classList.add('active');
                } else {
                    _this.isRamdom = false;
                    ramdomBtn.classList.remove('active');
                }
            }
            // xu li repeatBtn
        repeatBtn.onclick = function() {
            if (!_this.isReapeat) {
                _this.isReapeat = true;
                repeatBtn.classList.add("active");
            } else {
                _this.isReapeat = false;
                repeatBtn.classList.remove('active');
            }
        }
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercen = (audio.currentTime / audio.duration) * 100;
                progress.value = progressPercen;
            }
        }
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }
        audio.onplay = function() {
            _this.isPlaying = true;
            cdThumbAnimation.play();
            player.classList.add("playing");
        }
        audio.onpause = function() {
            _this.isPlaying = false;
            cdThumbAnimation.pause();
            player.classList.remove("playing");
        }
        audio.onended = function() {
                if (_this.isReapeat) {
                    audio.play();
                } else {
                    nextBtn.click();
                }
            }
            // nhan vao playList
        playList.onclick = function(e) {
            let songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    audio.play();
                }
                if (e.target.closest('.option')) {}
            }
        };

    },
    getCurrenSong: function() {
        return this.songs[this.currentIndex];

    },
    loadCurrentSong: function() {

        heading.textContent = this.getCurrenSong().name;
        cdThumb.style.backgroundImage = `url('${this.getCurrenSong().image}')`;
        audio.src = this.getCurrenSong().path;
        if ($('.song.active')) {
            $('.song.active').classList.remove('active');
        }
        const list = $$('.song');
        list.forEach((song) => {
            if (Number(song.getAttribute('data-index')) === this.currentIndex) {
                song.classList.add('active');
            }
        });
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1)
            this.currentIndex = 0;

        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0)
            this.currentIndex = this.songs.length - 1;
        this.loadCurrentSong();
    },
    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            if (this.currentIndex <= 3) {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            } else {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 300)
    },
    start: function() {
        this.handleEvents();
        this.loadCurrentSong();
        this.render();



    }
}
App.start();