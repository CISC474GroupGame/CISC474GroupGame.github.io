let DEFAULT_PLATFORM_COLOR = "#000000";

function loadLevelOne(canvas){
    //each of things should be exported in levelData
    let player = new Player(100, 200, 0, 0);
    let platforms = [];
    let powerups = [];
    let enemies = [];
    let coins = [];
    let endpoint;
    let coinsCount;

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
    endpoint = new Endpoint(plat2.x+plat2.width-50, plat2.y-plat2.height-50, 50, 100);
    coinsCount = coins.length;

    //coins
    let coin1 = new Coin(600, 300);
    let coin2 = new Coin(150, 550);
    let coin3 = new Coin(200, 200);
    let coin4 = new Coin(885, 400);
    let coin5 = new Coin(800, 650);
    let coin6 = new Coin(1000, 650);

    coins.push(coin1, coin2, coin3, coin4, coin5, coin6);

    levelData = {
        player: player,
        platforms: platforms,
        endpoint: endpoint,
        coins: coins,
        coinsCount: coinsCount,
    }
    return levelData;
}