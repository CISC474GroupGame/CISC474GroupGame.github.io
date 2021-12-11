class Powerup {
    //current powerup typs are 'jump', 'tiny', 'fly', 'invincible'
    //the type should eventually become an enumeration
    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.color = "#FFFFFF"
        this.type = type;
    }

    drawPowerup = function(context){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}