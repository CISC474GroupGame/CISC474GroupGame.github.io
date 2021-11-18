function loadFlatLevel(canvas) {
    //each of things should be exported in levelData
    let player = new Player(75, canvas.height/2, 0, 0);
    let platforms = [];
    let powerups = [];
    let enemies = [];
    let coins = [];
    let endpoint;
    let requiredCoins;

    //invisible walls on the sides to keep player contained -- make these invisible later
    let leftWall = new BasicPlatform(0, 0, 10, canvas.height, DEFAULT_PLATFORM_COLOR);
    let rightWall = new BasicPlatform(canvas.width - 10, 0, 10, canvas.height, DEFAULT_PLATFORM_COLOR);

    let plat1 = new BasicPlatform(0, canvas.height-50, canvas.width/2-100, 50);
    let plat2 = new BasicPlatform(canvas.width/2+100, canvas.height-50, canvas.width/2, 50);

    platforms.push(leftWall, rightWall, plat1, plat2);

    let fifthOfWidth = canvas.width / 5;
    let coin1 = new Coin(fifthOfWidth, canvas.height-100);
    let coin2 = new Coin(2 * fifthOfWidth, canvas.height-100);
    let coin3 = new Coin(3 * fifthOfWidth, canvas.height-100);
    let coin4 = new Coin(4 * fifthOfWidth, canvas.height-100);
    coins.push(coin1, coin2, coin3, coin4);

    endpoint = new Endpoint((4*fifthOfWidth)+(0.5*fifthOfWidth), canvas.height-150, 50, 100);
    requiredCoins = coins.length;

    let levelData = {
        player: player,
        platforms: platforms,
        coins: coins,
        endpoint: endpoint,
        requiredCoins: requiredCoins,
    }

    return levelData;
}