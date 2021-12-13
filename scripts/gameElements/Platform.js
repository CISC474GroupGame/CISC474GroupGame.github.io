class Platform{
    //two types: 'basic' and 'kill'
    constructor(x, y, width, height, type="basic", color="#989898"){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this._color = color;
        this.type = type;
        this.isColliding = false;
    }

    get color(){
        switch(this.type){
            case 'kill':
                // return '#ff9933';
                return '#ff5050';
                break;
            default:
                return this._color;
        }
    }
    set color(value){
        this._color = value;
    }
}