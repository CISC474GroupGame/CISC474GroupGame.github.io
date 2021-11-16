function loadLevelOne(canvas){
    let player = new Player(100, 200, 0, 0);
    let platforms = [];
    let powerups = [];
    let enemies = [];
    let coins = [];

    //invisible walls on the sides to keep player contained -- make these invisible later
    let leftWall = new BasicPlatform(0, 0, 10, canvas.height);
    let rightWall = new BasicPlatform(canvas.width - 10, 0, 10, canvas.height);

    //regular platforms
    let plat1 = new BasicPlatform(0, 600, 500, 50);
    let plat2 = new BasicPlatform(700, 700, 500, 50);

    let plat3 = new BasicPlatform(100, 450, 500, 20);
    let plat4 = new BasicPlatform(700, 350, 10, 200);
    let plat5 = new BasicPlatform(700, 550, 200, 10);
    let plat6 = new BasicPlatform(850, 450, 100, 10);

    let endpoint = new Endpoint(plat2.x+plat2.width-50, plat2.y-plat2.height-50, 50, 100);

    platforms.push(leftWall, rightWall, plat1, plat2, plat3, plat4, plat5, plat6);
    levelData = {
        player: player,
        platforms: platforms,
        endpoint: endpoint,
    }
    return levelData;
}