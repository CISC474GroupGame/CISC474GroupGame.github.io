class Player extends CharacterObject{
	constructor(context, x, y, vx, vy) {
		super(context, x, y, vx, vy);
		this.width = 50;
		this.height = 50;
        this.gravity = 0.4;
        this.friction = 0.8;
        this.speed = 5;
        this.jumping = false;
        this.grounded = false;
	}
	
    draw(){
        // console.log(this.isColliding);
        this.context.fillStyle = this.isColliding ? '#ff8080':'#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

	update(secondsPassed, keys){
        // let friction = 0.7;
        let movingSpeed = 0.01;
        let vx = this.vx;
        let vy = this.vy;
        if (keys.ArrowLeft) {
            vx -= movingSpeed;
        }
        if (keys.ArrowRight) {
            vx += movingSpeed;
        }
        if(keys.ArrowUp){
            if(this.jumping == false){
                vy += 1;
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
        }else{
            vy=0;
        }

        //indicate player is not in the air after collision
        if(this.isColliding == true){
            this.jumping = false;
        }

        this.vx = vx;
        this.x += this.vx;
        this.vy = vy;
        this.y -= this.vy;

        // ========== logic from example codepen ==========
        if(keys.ArrowUp){
            if(!this.jumping && this.grounded){
                this.jumping = true;
                this.grounded = false;
                this.vy = -this.speed * 2.5; //may need to make player speed positive here
            }
        }
        if(keys.ArrowLeft){
            if(this.vx > -this.speed){
                this.vx = this.vx - 1;
            }
        }
        if(keys.ArrowRight){
            if(this.vx < this.speed){
                this.vx = this.vx + 1;
            }
        }
        this.vx *= this.friction;
        this.vy += this.gravity;

        //this section may need to get refactored into draw somehow
        this.context.clearRect(0, 0, width, height);
        this.context.beginPath();

        this.grounded = false;

        //other world rendering goes here

        if(this.grounded){
            this.velY = 0;
        }

        this.x += this.vx;
        this.y += this.vy;

        // ===== old stuff ======
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