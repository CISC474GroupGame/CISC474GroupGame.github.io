class levelOne {

    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;

        let playerModel = new Player(this.context, 100, 200, 0, 0);
        let platforms = [];
        let allGameObjects = [];
        let platformOne = new BasicPlatform(this.context, 0, 600, 500, 50); //context, x, y, width, height
        let platformTwo = new BasicPlatform(this.context, 700, 700, 500, 50);
        platforms.push(platformOne, platformTwo);
        allGameObjects.push(playerModel, platformOne, platformTwo);


        this.levelData = {
            playerModel: playerModel,
            platforms: platforms,
            allGameObjects: allGameObjects,
        }
    }

    loadLevel = function() {
        return levelData;
    }

}