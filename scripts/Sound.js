class Sound {
    constructor(type){
        this.sound = document.createElement('audio');
        switch(type){
            case 'coin':
                this.src = './../audio/coin.wav';
                this.sound.volume = 0.4;
                break;
            case 'click':
                this.src = './../audio/click.wav';
                // console.log(this.sound.onended);
                // this.endSound = this.sound.onended;
                break;
            case 'jump':
                this.src = './../audio/jump.ogg';
                this.sound.volume = 0.3;
                break;
            case 'key':
                this.src = './../audio/key.wav';
                this.sound.volume = 1;
                break;
            case 'powerup':
                this.src = './../audio/powerup.wav';
                this.sound.volume = 1;
                break;
            case 'die':
                this.src = './../audio/die.mp3';
                this.sound.volume = 0.25;
                break;
            case 'win':
                this.src = './../audio/win.wav';
                break;
            default:
                this.src = '';
        }
        this.sound.src = this.src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play(){
        this.sound.play();
    }
    stop(){
        this.sound.pause();
    }
}