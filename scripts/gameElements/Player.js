class Player extends CharacterObject{
	constructor(context, x, y, vx, vy) {
		super(context, x, y, vx, vy);
		this.width = 50;
		this.height = 50;
        this.gravity = 100;
        this.jumping = true;
	}
	
    draw(){
        // console.log(this.isColliding);
        this.context.fillStyle = this.isColliding ? '#ff8080':'#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

	update(secondsPassed, keys){
        // let friction = 0.7;
        let movingSpeed = 300;
        let vx = 0;
        let vy = 0;
        if (keys.ArrowLeft) {
            vx -= movingSpeed;
        }
        if (keys.ArrowRight) {
            vx += movingSpeed;
        }
        if(keys.ArrowUp){
            if(this.jumping == false){
                vy += 2000;
                this.jumping = true;
            }
            // vy += movingSpeed;
            // this.jumping = true;
        }

        //if the player is not colliding, allow them to move down (will remove later)
        if(!this.isColliding){
            if(keys.ArrowDown){
                vy -= movingSpeed
            }
        }

        //if the player is in the air, apply gravity
        if(this.jumping == true){
            vy -= this.gravity;
        }

        //indicate player is not in the air after collision
        if(this.isColliding == true){
            this.jumping = false;
        }

        this.vx = vx;
        this.x += this.vx * secondsPassed;
        this.vy = vy;
        this.y -= this.vy * secondsPassed;


        // if (keys.ArrowUp && playerModel.volY >= 0) {
        //     playerModel.volY = -800;
        //     playerModel.isColliding = false;
        // }
        // if (!playerModel.isColliding) {
        //     playerModel.volY += secondsPassed * this.gravity;
        //     playerModel.posY += playerModel.volY * secondsPassed;
        // }else{
        //     playerModel.volY=0;
        // }
    }
}