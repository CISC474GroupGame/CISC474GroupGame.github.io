class Powerup {
    //current powerup typs are 'jump', 'tiny', 'fly', 'invincible'
    //the type should eventually become an enumeration
    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this._color = "#FFFFFF"
        this.type = type;
    }

    get color(){

        switch(this.type){
            case 'jump':
                return '#9933ff';
                break;
            case 'tiny':
                return '#ff99cc';
                break;
            case 'fly':
                return '#66ccff';
                break;
            case 'invincible':
                return '#ff5050';
                break;
            default:
                return this._color;
        }
    }

    set color(value){
        this._color = value;
    }

    drawPowerup = function(context){
        // context.rotate(Math.PI / 2);
        context.translate(this.x, this.y);
        context.rotate( (Math.PI / 180) * 45);
        context.translate(-this.x, -this.y);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        // context.rotate(45 * Math.PI / 180);
    }
}