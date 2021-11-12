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
            path: "https://data25.chiasenhac.com/download2/2202/5/2201284-0ac3f306/128/Easy%20On%20Me%20-%20Adele%20(NhacPro.net).mp3",
            image: "https://i2.wp.com/medianub.com/wp-content/uploads/2021/11/Adele-Easy-On-Me.jpeg?fit=695%2C441&ssl=1"
        }, {
            name: "East Of Eden",
            singer: "Zella Day",
            path: "https://data04.chiasenhac.com/downloads/1508/5/1507159-b2a8caa8/128/East%20Of%20Eden%20-%20Zella%20Day.mp3",
            image: "https://data.chiasenhac.com/data/cover/43/42035.jpg"
        }, {
            name: "Walk Thru Fire",
            singer: "Vicetone ft Meron Ryan",
            path: "https://data34.chiasenhac.com/downloads/1939/5/1938435-5007db99/128/Walk%20Thru%20Fire%20-%20Vicetone_%20Meron%20Ryan.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2018/08/06/f/5/6/1/1533518669570_640.jpg"
        }, {
            name: 'See You Again',
            singer: 'Charlie Puth ft Wiz Khalifa',
            path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
            image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
        },
        {
            name: "Unstoppable",
            singer: "Sia",
            path: "https://data2.chiasenhac.com/stream2/1620/5/1619524-39627886/128/Unstoppable%20-%20Sia.mp3",
            image: "https://mp3how.com/wp-content/uploads/2021/08/download-2.jpeg"
        }, {
            name: "Halo",
            singer: "Beyonce",
            path: "https://data51.chiasenhac.com/downloads/1007/5/1006846-2972b850/128/Halo%20-%20Beyonce.mp3",
            image: "https://i1.wp.com/winnaijatv.com/wp-content/uploads/2021/08/Beyonce-Halo-DOWNLOAD-MP3.jpg?resize=708%2C708&ssl=1"
        },
        {
            name: 'Symphony',
            singer: 'Clean Bandit',
            path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
            image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
        }, {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
            image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
        }, {
            name: 'Alone',
            singer: 'Marshmello',
            path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
            image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
        }, {
            name: 'Something Just Like This',
            singer: 'The Chainsmokers & Coldplay',
            path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        }, {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
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