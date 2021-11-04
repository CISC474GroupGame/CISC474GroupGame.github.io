class Player extends CharacterObject{
	constructor(context, x, y, vx, vy) {
		super(context, x, y, vx, vy);
		this.width = 50;
		this.height = 50;
        this.gravity = 2000;
	}
	
    draw(){
        this.context.fillStyle = this.isColliding ? '#ff8080':'#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

	update(secondsPassed, keys){
        let vx = 0;
        if (keys.ArrowLeft) {
            vx -= movingSpeed;
            // playerAvatar.style.transform = 'scaleX(-1)';
        }
        if (keys.ArrowRight) {
            vx += movingSpeed;
            // playerAvatar.style.transform = 'scaleX(1)';
        }
        this.vx = vx;
        this.x += this.vx * secondsPassed;
        // this.y += this.vy * secondsPassed;

        if (keys.ArrowUp && playerModel.volY >= 0) {
            playerModel.volY = -800;
            playerModel.isColliding = false;
        }
        if (!playerModel.isColliding) {
            playerModel.volY += secondsPassed * this.gravity;
            playerModel.posY += playerModel.volY * secondsPassed;
        }else{
            playerModel.volY=0;
        }
    }
}