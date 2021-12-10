class CharacterObject {
    constructor(x, y, vx, vy){
        this._x = x;
        this._y = y;
        this._vx = vx;
        this._vy = vy;
        this._isColliding = false;
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
        this._vx = value;
    }
    set isColliding(value){
        this._isColliding = value;
    }
}