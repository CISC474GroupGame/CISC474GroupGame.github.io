let DEFAULT_PLATFORM_COLOR = "#000000";

function loadLevelZero(canvas) {
    //class attributes
    let player = new Player(75, canvas.height/2, 0, 0);
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
    let plat1 = new BasicPlatform(0, canvas.height-50, canvas.width/2-100, 50);
    let plat2 = new BasicPlatform(canvas.width/2+100, canvas.height-50, canvas.width/2, 50);
    platforms.push(leftWall, rightWall, plat1, plat2);

    //coins
    let fifthOfWidth = canvas.width / 5;
    let coin1 = new Coin(fifthOfWidth, canvas.height-100);
    let coin2 = new Coin(2 * fifthOfWidth, canvas.height-100);
    let coin3 = new Coin(3 * fifthOfWidth, canvas.height-100);
    let coin4 = new Coin(4 * fifthOfWidth, canvas.height-100);
    coins.push(coin1, coin2, coin3, coin4);
    coinsCount = coins.length;

    //game endpoint
    endpoint = new Endpoint((4*fifthOfWidth)+(0.5*fifthOfWidth), canvas.height-150, 50, 100);

    //create level instance and return it
    let theLevel = new Level(canvas, player, platforms, powerups, enemies, coins, endpoint, coinsCount);
    return theLevel
}

function loadLevelOne(canvas){
    //class attributes 
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

    //game endpoint
    endpoint = new Endpoint(plat2.x+plat2.width-50, plat2.y-plat2.height-50, 50, 100);

    //coins
    let coin1 = new Coin(600, 300);
    let coin2 = new Coin(150, 550);
    let coin3 = new Coin(200, 200);
    let coin4 = new Coin(885, 400);
    let coin5 = new Coin(800, 650);
    let coin6 = new Coin(1000, 650);
    coins.push(coin1, coin2, coin3, coin4, coin5, coin6);
    coinsCount = coins.length;

    //create level instance and return it
    let theLevel = new Level(canvas, player, platforms, powerups, enemies, coins, endpoint, coinsCount);
    return theLevel;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function loadRandomLevel(canvas){
    //class attributes 
    let player = new Player(random(0,canvas.width), random(0,canvas.height), 0, 0);
    let platforms = [];
    let powerups = [];
    let enemies = [];
    let coins = [];
    let endpoint;
    let coinsCount;

    //invisible walls on the sides to keep player contained -- make these invisible later
    let leftWall = new BasicPlatform(0, 0, 10, canvas.height, DEFAULT_PLATFORM_COLOR);
    let rightWall = new BasicPlatform(canvas.width - 10, 0, 10, canvas.height, DEFAULT_PLATFORM_COLOR);

    let platCount = random(1,11);
    for(i = 0; i <= platCount; i++){
        let platform = new BasicPlatform(random(0,canvas.width),random(0,canvas.height),random(50,500),random(10,200),DEFAULT_PLATFORM_COLOR);
        platforms.push(platform);
    }
    platforms.push(leftWall,rightWall);

    //game endpoint
    endpoint = new Endpoint(random(0,canvas.width), random(0,canvas.height), 50, 100);

    coinsCount = random(1,11);
    for(i = 0; i <= coinsCount; i++){
        let coin = new Coin(random(0,canvas.width),random(0,canvas.height));
        coins.push(coin);
    }

    //create level instance and return it
    let theLevel = new Level(canvas, player, platforms, powerups, enemies, coins, endpoint, coinsCount);
    return theLevel;
}