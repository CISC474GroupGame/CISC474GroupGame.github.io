class Endpoint{
    constructor(x, y, width, height){
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this._hasKey = false;
        // this._color = this._hasKey ? '#00ff99' : '#ff5050';
        this._color = '#ff5050';
    }
    
    get hasKey(){
        return this._hasKey;
    }
    set hasKey(value){
        this._hasKey = value;
    }
    get color(){
        return this._color;
    }
    set color(value){
        this._color = value;
    }
}