class Endpoint{
    constructor(x, y, width=50, height=100){
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this._hasKey = false;
        // this._color = this._hasKey ? '#00ff99' : '#ff5050';
        // this._color = '#ff5050';
        // this._color = '#ffcc00';
        this._color = '#996633';
    }
    
    get hasKey(){
        return this._hasKey;
    }
    set hasKey(value){
        this._hasKey = value;
    }
    get color(){
        if(this._hasKey === false){
            return this._color;
        }
        else{
            return '#00ff99';
        }
    }
    set color(value){
        this._color = value;
    }
}