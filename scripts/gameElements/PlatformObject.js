class PlatformObject {
    constructor(x, y, width, height, color, type){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        this.vx = 0;
        this.vy = 0;
        this.isColliding = false;
    }
}