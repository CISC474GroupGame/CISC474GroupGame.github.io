class Coin{
    constructor(x, y){
        this.x = x,
        this.y = y,
        this.radius = 15,
        this.startAngle = 0,
        this.endAngle = Math.PI * 2,
        this.width = 25,
        this.height = 25,
        this.color = "#ffff99";
        // this.image = "./images/coin.png"
    }

    drawCoin = function(context){

        //====== commented stuff here will draw a circle for the coin instead of rectangle, but
        //  current collision detection function won't detect with circles, so until that is rewritten,
        //  the coins need to be rectangles

        // context.beginPath();
        // context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
        // context.stroke();
        // context.fillStyle = this.color;
        // context.fill();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}