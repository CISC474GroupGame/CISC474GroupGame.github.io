class Key { //can make a super class for this and coin called collectables
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.color = '#00ff99';
    }

    drawKey = function(context){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}