class Platform{
    constructor(x, y, width, height, type="basic", color="#000000"){
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
                return '#808080';
                break;
            default:
                return this._color;
        }
    }
    set color(value){
        this._color = value;
    }
}