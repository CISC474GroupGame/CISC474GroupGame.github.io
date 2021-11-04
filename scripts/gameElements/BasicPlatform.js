class BasicPlatform extends PlatformObject{
    constructor(context, x, y, width, height){
        super(context, x, y, width, height);
    }

    draw(){
        this.context.fillStyle = '#000000';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(){

    }
}