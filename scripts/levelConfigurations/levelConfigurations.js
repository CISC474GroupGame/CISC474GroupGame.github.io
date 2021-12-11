function loadLevelZero(canvas) {

    //variable to use to help make levels fit the size of the screen
    let fifthOfWidth = canvas.width / 5;

    //class attributes
    let player = new Player(fifthOfWidth/2, canvas.height/2);
    let platforms = [];
    let powerups = [];
    let coins = [];
    let endpoint;
    let coinsCount;
    let key;

    //invisible walls on the sides to keep player contained -- make these invisible later
    let leftWall = new Platform(0, 0, 10, canvas.height);
    let rightWall = new Platform(canvas.width - 10, 0, 10, canvas.height);

    //regular platforms
    let plat1 = new Platform(0, canvas.height-50, canvas.width/2-100, 50);
    let plat2 = new Platform(canvas.width/2+100, canvas.height-50, canvas.width/2, 50);
    let plat3 = new Platform(canvas.width/4, canvas.height*0.75, 200, 20);
    let plat4 = new Platform(canvas.width/6, canvas.height*0.5, 200, 20);
    let plat5 = new Platform(canvas.width/4, canvas.height*0.25, 200, 20, 'kill');
    platforms.push(leftWall, rightWall, plat1, plat2, plat3, plat4, plat5);

    //coins
    let coin1 = new Coin(fifthOfWidth, canvas.height-100);
    let coin2 = new Coin(2 * fifthOfWidth, canvas.height-100);
    let coin3 = new Coin(3 * fifthOfWidth, canvas.height-100);
    let coin4 = new Coin(4 * fifthOfWidth, canvas.height-100);
    // coins.push(coin1, coin2, coin3, coin4);
    coinsCount = coins.length;

    //powerups
    let pow1 = new Powerup(2*fifthOfWidth, canvas.height-100, "jump");
    let pow2 = new Powerup(3 * fifthOfWidth, canvas.height-100, "tiny");
    let pow3 = new Powerup(fifthOfWidth, canvas.height-100, "invincible");
    powerups.push(pow1, pow2, pow3);

    //key to unlock endpoint
    key = new Key(canvas.width*0.5, canvas.height*0.60);

    //game endpoint
    endpoint = new Endpoint((4*fifthOfWidth)+(0.5*fifthOfWidth), canvas.height-150, 50, 100);

    //create level instance and return it
    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel
}

function loadLevelOne(canvas){

    //variables to help make levels fit the size of the screen
    let fifthOfWidth = canvas.width / 5;
    let fifthOfHeight = canvas.height / 5;

    //class attributes 
    let player = new Player(fifthOfWidth, canvas.height/2-fifthOfHeight);
    let platforms = [];
    let powerups = [];
    let coins = [];
    let endpoint;
    let coinsCount;
    let key;

    //invisible walls on the sides to keep player contained -- make these invisible later
    let leftWall = new Platform(0, 0, 10, canvas.height);
    let rightWall = new Platform(canvas.width - 10, 0, 10, canvas.height);

    //regular platforms
    let plat1 = new Platform(0, fifthOfWidth*2, 500, 50);
    let plat2 = new Platform(700, 700, 500, 50);
    let plat3 = new Platform(100, 450, 500, 20);
    let plat4 = new Platform(700, 350, 10, 200);
    let plat5 = new Platform(700, 550, 200, 10);
    let plat6 = new Platform(850, 450, 100, 10);
    platforms.push(leftWall, rightWall, plat1, plat2, plat3, plat4, plat5, plat6);

    //key
    key = new Key(canvas.width*0.25, canvas.height*0.75);

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
    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel;
}