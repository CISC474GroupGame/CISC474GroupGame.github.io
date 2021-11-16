class Player extends CharacterObject{
	constructor(x, y, vx, vy) {
		super(x, y, vx, vy);
		this.width = 50;
		this.height = 50;
        this.gravity = 0.4;
        this.friction = 0.8;
        this.speed = 5;
        this.jumping = false;
        this.grounded = false;
	}
}