class PlatformObject {
    constructor(context, x, y, width, height){
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = 0;
        this.vy = 0;
        this.isColliding = false;
    }
}