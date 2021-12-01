class Enemy extends CharacterObject {
    constructor(x, y, vx, vy){
        super(x, y, vx, vy);

        //physics stuff
        this.width = 35;
        this.height = 35;

        //game stuff
        this.color = '#ff6666';
    }
}