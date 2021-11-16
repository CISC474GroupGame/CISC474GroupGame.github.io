let DEFAULT_PLATFORM_COLOR = "#000000";

function loadLevelOne(canvas){
    let player = new Player(100, 200, 0, 0);
    let platforms = [];
    let powerups = [];
    let enemies = [];
    let coins = [];

    //invisible walls on the sides to keep player contained -- make these invisible later
    let leftWall = new BasicPlatform(0, 0, 10, canvas.height, DEFAULT_PLATFORM_COLOR);
    let rightWall = new BasicPlatform(canvas.width - 10, 0, 10, canvas.height, DEFAULT_PLATFORM_COLOR);

    //regular platforms
    let plat1 = new BasicPlatform(0, 600, 500, 50, DEFAULT_PLATFORM_COLOR);
    let plat2 = new BasicPlatform(700, 700, 500, 50, DEFAULT_PLATFORM_COLOR);
    let plat3 = new BasicPlatform(100, 450, 500, 20, DEFAULT_PLATFORM_COLOR);
    let plat4 = new BasicPlatform(700, 350, 10, 200, DEFAULT_PLATFORM_COLOR);
    let plat5 = new BasicPlatform(700, 550, 200, 10, DEFAULT_PLATFORM_COLOR);
    let plat6 = new BasicPlatform(850, 450, 100, 10, DEFAULT_PLATFORM_COLOR);

    platforms.push(leftWall, rightWall, plat1, plat2, plat3, plat4, plat5, plat6);

    //endpoint
    let endpoint = new Endpoint(plat2.x+plat2.width-50, plat2.y-plat2.height-50, 50, 100);

    //coins
    let coin1 = new Coin(100, 100);

    coins.push(coin1);

    levelData = {
        player: player,
        platforms: platforms,
        endpoint: endpoint,
        coins: coins,
    }
    return levelData;
}