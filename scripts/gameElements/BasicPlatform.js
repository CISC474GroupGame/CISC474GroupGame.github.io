class BasicPlatform{ //seems redundent now but may add more properties later
    constructor(context, x, y, width, height){
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(){
        this.context.fillStyle = '#000000';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(){

    }
}