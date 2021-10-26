class Player extends GameObject{
	constructor(context, x, y, vx, vy) {
		super(context, x, y, vx, vy);
		this.width = 50;
		this.height = 50;
	}
	
    draw(){
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
	update(secondsPassed, keys){
        let vx = 0;
        if (keys.ArrowLeft) {
            console.log("left key pressed")
            vx -= movingSpeed;
            // playerAvatar.style.transform = 'scaleX(-1)';
        }
        if (keys.ArrowRight) {
            console.log("right key pressed")
            vx += movingSpeed;
            // playerAvatar.style.transform = 'scaleX(1)';
        }
        this.vx = vx;
        this.x += this.vx * secondsPassed;
        // this.y += this.vy * secondsPassed;
    }
}