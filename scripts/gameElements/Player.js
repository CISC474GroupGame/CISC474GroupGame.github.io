class Player{
	constructor(x, y, vx=0, vy=0) {

        //physics stuff
        this._x = x;
        this._y = y;
        this._vx = vx;
        this._vy = vy;
		this._width = 50;
		this._height = 50;
        this._gravity = 0.4;
        this._friction = 0.8;
        this._speed = 5;
        this._jumping = false;
        this._grounded = false;

        //game stuff
        this._color = '#808080';
        this._coinCount = 0;
        this._powerup = 'none';
	}

    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    get vx(){
        return this._vx;
    }
    get vy(){
        return this._vy;
    }
    get isColliding(){
        return this._isColliding;
    }

    get width(){
        switch(this._powerup){
            case 'tiny':
                return 10;
                break;
            default:
                return this._width;
        }
    }
    get height(){
        switch(this._powerup){
            case 'tiny':
                return 10;
                break;
            default:
                return this._height;
        }
    }
    get gravity(){
        switch(this._powerup){
            case 'jump':
                return 0.2;
                break;
            default:
                return this._gravity;
        }
    }
    get friction(){
        return this._friction;
    }
    get speed(){
        return this._speed;
    }
    get jumping(){
        return this._jumping;
    }
    get grounded(){
        return this._grounded;
    }
    get color(){

        switch(this._powerup){
            case 'jump':
                return '#9933ff';
                break;
            case 'tiny':
                return '##ff99cc';
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
    get coinCount(){
        return this._coinCount;
    }
    get powerup(){
        return this._powerup;
    }

    set x(value){
        this._x = value;
    }
    set y(value){
        this._y = value;
    }
    set vx(value){
        this._vx = value;
    }
    set vy(value){
        this._vy = value;
    }
    set isColliding(value){
        this._isColliding = value;
    }

    set width(value){
        this._width = value;
    }
    set height(value){
        this._height = value;
    }
    set gravity(value){
        this._gravity = value;
    }
    set friction(value){
        this._friction = value;
    }
    set speed(value){
        this._speed = value;
    }
    set jumping(value){
        this._jumping = value;
    }
    set grounded(value){
        this._grounded = value;
    }
    set color(value){
        this._color = value;
    }
    set coinCount(value){
        this._coinCount = value;
    }
    set powerup(value){
        this._powerup = value;
    }
}