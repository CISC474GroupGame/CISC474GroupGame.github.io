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
    let pow1 = new Powerup(fifthOfWidth, canvas.height-100, "invincible");
    let pow2 = new Powerup(2 * fifthOfWidth, canvas.height-100, "jump");
    let pow3 = new Powerup(3 *fifthOfWidth, canvas.height-100, "tiny");
    let pow4 = new Powerup(4 * fifthOfWidth, canvas.height-100, "fly");
    powerups.push(pow1, pow2, pow3, pow4);

    //key to unlock endpoint
    key = new Key(canvas.width*0.5, canvas.height*0.60);

    //game endpoint
    endpoint = new Endpoint((4*fifthOfWidth)+(0.5*fifthOfWidth), canvas.height-150, 50, 100);

    //create level instance and return it
    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel
}

// function loadLevelOne(canvas){

//     //variables to help make levels fit the size of the screen
//     let fifthOfWidth = canvas.width / 5;
//     let fifthOfHeight = canvas.height / 5;

//     //class attributes 
//     let player = new Player(fifthOfWidth, canvas.height/2-fifthOfHeight);
//     let platforms = [];
//     let powerups = [];
//     let coins = [];
//     let endpoint;
//     let coinsCount;
//     let key;

//     //invisible walls on the sides to keep player contained -- make these invisible later
//     let leftWall = new Platform(0, 0, 10, canvas.height);
//     let rightWall = new Platform(canvas.width - 10, 0, 10, canvas.height);

//     //regular platforms
//     let plat1 = new Platform(0, fifthOfWidth*2, 500, 50);
//     let plat2 = new Platform(700, 700, 500, 50);
//     let plat3 = new Platform(100, 450, 500, 20);
//     let plat4 = new Platform(700, 350, 10, 200);
//     let plat5 = new Platform(700, 550, 200, 10);
//     let plat6 = new Platform(850, 450, 100, 10);
//     platforms.push(leftWall, rightWall, plat1, plat2, plat3, plat4, plat5, plat6);

//     //key
//     key = new Key(canvas.width*0.25, canvas.height*0.75);

//     //game endpoint
//     endpoint = new Endpoint(plat2.x+plat2.width-50, plat2.y-plat2.height-50, 50, 100);

//     //coins
//     let coin1 = new Coin(600, 300);
//     let coin2 = new Coin(150, 550);
//     let coin3 = new Coin(200, 200);
//     let coin4 = new Coin(885, 400);
//     let coin5 = new Coin(800, 650);
//     let coin6 = new Coin(1000, 650);
//     coins.push(coin1, coin2, coin3, coin4, coin5, coin6);
//     coinsCount = coins.length;

//     //create level instance and return it
//     let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
//     return theLevel;
// }

function collinLevelOne(canvas){

    let width = canvas.width;
    let height = canvas.height;

    let player, platforms, powerups, coins, endpoint, coinsCount, key;

    player = new Player(width/8, height/2);

    platforms = []
    let platform1 = new Platform(0, height-100, 2*width/3, 50);
    platforms.push(platform1);

    powerups = []

    coins = []
    let coin1 = new Coin(width/3-50, platform1.y-50);
    coins.push(coin1);

    endpoint = new Endpoint(2*width/3-50, platform1.y-100);

    coinsCount = coins.length;

    key = new Key(width/3+200, platform1.y-70);

    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel;
}

function collinLevelTwo(canvas){
    
    let width = canvas.width;
    let height = canvas.height;

    let player, platforms, powerups, coins, endpoint, coinsCount, key;

    player = new Player(width/8, height/2);

    platforms = []
    let floorLeft = new Platform(0, height-100, width/4, 50);
    let floorMid = new Platform(floorLeft.x + floorLeft.width + 200, height-100, width/4, 50);
    let floorRight = new Platform(floorMid.x + floorMid.width + 300, height-100, width/4, 50);
    let keyPlatform = new Platform(2*width/8, 2*height/8, 200, 25);
    let powerPlatform = new Platform(5*width/8, 5*height/8, 200, 25);
    platforms.push(floorLeft, floorMid, floorRight, keyPlatform, powerPlatform);

    powerups = []
    let jumpPowerup = new Powerup(powerPlatform.x + powerPlatform.width/2, powerPlatform.y-70, 'jump');
    powerups.push(jumpPowerup);

    coins = []
    let coin1 = new Coin(floorMid.x+floorMid.width/3, floorMid.y-50);
    let coin2 = new Coin(floorMid.x+floorMid.width/2, keyPlatform.y);
    let coin3 = new Coin(player.x, player.y - 100);
    let coin4 = new Coin(floorRight.x + floorRight.width/4, floorRight.y-50);
    coins.push(coin1, coin2, coin3, coin4);

    endpoint = new Endpoint(floorRight.x + 0.5*floorRight.width, floorLeft.y-100);

    coinsCount = coins.length;

    key = new Key(keyPlatform.x + keyPlatform.width/3, keyPlatform.y - 70);

    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel;
}

function collinLevelThree() {

    let width = canvas.width;
    let height = canvas.height;

    let player, platforms, powerups, coins, endpoint, coinsCount, key;

    platforms = []
    let spawnPlatform = new Platform(0, 2*height/8, width/8, 20);
    let keyPlatform = new Platform(0, 7*height/8, width/8, 20, 'kill');
    let invincePowerupPlatform = new Platform(7*width/8, 7*height/8, width/8, 20);
    let endpointPlatform = new Platform(6*width/8, 2*height/8, width/8, 20);
    let endpointWallLeft = new Platform(endpointPlatform.x + endpointPlatform.width - 10, endpointPlatform.y - 2*height/8, 10, 2*height/8);
    let endpointWallRight = new Platform(endpointPlatform.x + 20, endpointPlatform.y - 2*height/8 - 15, 10, 2*height/8);
    let centerPlatform = new Platform(2.8*width/8, 5*height/8, 2*width/8, 30);
    let topLeftCenter = new Platform(1.5*width/8, 3*height/8, width/16, 20, 'kill');
    let bottomLeftCenter = new Platform(1.5*width/8, 6*height/8, width/16, 20);
    let topRightCenter = new Platform(5*width/8, 3*height/8, width/16, 20);
    let bottomRightCenter = new Platform(6*width/8, 6*height/8, width/16, 20);
    platforms.push(spawnPlatform, keyPlatform, invincePowerupPlatform, endpointPlatform, endpointWallLeft, endpointWallRight, centerPlatform);
    platforms.push(topLeftCenter, bottomLeftCenter, topRightCenter, bottomRightCenter)

    powerups = []
    let invinciblePowerup = new Powerup(invincePowerupPlatform.x+invincePowerupPlatform.width/2, invincePowerupPlatform.y-50, 'invincible');
    let shrinkPowerup = new Powerup(centerPlatform.x + centerPlatform.width/2, centerPlatform.y - 50, 'tiny');
    powerups.push(invinciblePowerup, shrinkPowerup);

    coins = []
    let c1 = new Coin(topLeftCenter.x + topLeftCenter.width/2, topLeftCenter.y-30);
    let c2 = new Coin(bottomLeftCenter.x + bottomLeftCenter.width/2, bottomLeftCenter.y-30);
    let c3 = new Coin(bottomRightCenter.x + bottomRightCenter.width/2, bottomRightCenter.y-30);
    let c4 = new Coin(centerPlatform.x + centerPlatform.width/4, centerPlatform.y-30);
    let c5 = new Coin(centerPlatform.x + 3*centerPlatform.width/4, centerPlatform.y-30);
    

    coins.push(c1, c2, c3, c4, c5);

    endpoint = new Endpoint(endpointPlatform.x+endpointPlatform.width/2, endpointPlatform.y-100);

    coinsCount = coins.length;

    key = new Key(keyPlatform.width/3, keyPlatform.y-50);

    player = new Player(spawnPlatform.x+spawnPlatform.width/2, spawnPlatform.y - 100);

    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel;
}


function JHLevelThree(canvas){

    //variables to help make levels fit the size of the screen
    let fifthOfWidth = canvas.width / 5;
    let fifthOfHeight = canvas.height / 5;

    //class attributes
    let player = new Player(fifthOfWidth-250, canvas.height/2-fifthOfHeight);
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

    let plat1 = new Platform(0, fifthOfWidth*2, 150, 50);
    let plat2 = new Platform(1100, 225, 50, 50);
    let plat3 = new Platform(550, canvas.height-100, 100, 50);
    let plat4 = new Platform(1050,0,20,600);
    let plat5 = new Platform(1150,0,20,600);
    let plat6 = new Platform(1050,300,35,20);
    let plat7 = new Platform(1125,400,35,20);
    let plat8 = new Platform(canvas.width-400,canvas.height-50,300,20);
    let plat9 = new Platform(1050,500,35,20);
    platforms.push(leftWall, rightWall, plat1,plat2,plat3,plat4,plat5,plat6,plat7,plat8,plat9);

    let pow2 = new Powerup(150, canvas.height-400, "jump");
    let pow3 = new Powerup(4 *fifthOfWidth+100, canvas.height-150, "tiny");
    let pow4 = new Powerup(3 * fifthOfWidth, canvas.height-100, "fly");

    powerups.push(pow2,pow3,pow4);
    //key
    key = new Key(canvas.width*0.25, canvas.height*0.75);

    //game endpoint
    endpoint = new Endpoint(plat2.x+plat2.width-50, plat2.y-plat2.height-50, 50, 100);

    //coins
    let coin1 = new Coin(600, 300);
    let coin2 = new Coin(600, 100);
    let coin3 = new Coin(550, 250);
    let coin4 = new Coin(650, 250);
    let coin5 = new Coin(500,200);
    let coin6 = new Coin(700,200);
    let coin7 = new Coin(450,150);
    let coin8 = new Coin(750,150);
    let coin9 = new Coin(450,100);
    let coin10 = new Coin(750,100);
    let coin11 = new Coin(500,50);
    let coin12 = new Coin(700,50);
    let coin13 = new Coin(550,70);
    let coin14 = new Coin(650,70);

    coins.push(coin1,coin2,coin3,coin4,coin5,coin6,coin7,coin8,coin9,coin10,coin11,coin12,coin13,coin14);
    coinsCount = coins.length;

    //create level instance and return it
    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel;
}

function JHLevelTwo(canvas){
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
    let plat2 = new Platform(canvas.width/2+440, canvas.height-50, canvas.width/8 +10, 50);
    let plat3 = new Platform(canvas.width/6-125, canvas.height*0.75, 50, 20);
    let plat4 = new Platform(canvas.width/6, canvas.height*0.5, 50, 20);
    let plat5 = new Platform(canvas.width/4, canvas.height*0.25, 200, 20, 'kill');
    let plat6 = new Platform(canvas.width/4+400, canvas.height*0.25-100, 200, 20, 'kill');
    platforms.push(leftWall, rightWall, plat1, plat2,plat3,plat4,plat5,plat6);

    //coins
    let coin1 = new Coin(3*fifthOfWidth+100, canvas.height-150);
    let coin2 = new Coin(3*fifthOfWidth+150, canvas.height-200);
    let coin3 = new Coin(3*fifthOfWidth+100, canvas.height-200);
    let coin4 = new Coin(3*fifthOfWidth+150, canvas.height-150);

    let coin5 = new Coin(canvas.width/4, canvas.height*0.25-25);
    let coin6 = new Coin(canvas.width/4+420, canvas.height*0.25-120);
    coins.push(coin1, coin2, coin3, coin4,coin5,coin6);
    coinsCount = coins.length;

    //powerups
    let pow1 = new Powerup(fifthOfWidth, canvas.height-100, "invincible");
    let pow2 = new Powerup(2 * fifthOfWidth, canvas.height-100, "jump");
    let pow3 = new Powerup(3 *fifthOfWidth+270, canvas.height-200, "tiny");

    powerups.push(pow1, pow2, pow3);

    //key to unlock endpoint
    key = new Key(canvas.width*0.5, canvas.height*0.60);

    //game endpoint
    endpoint = new Endpoint((4*fifthOfWidth)+(0.5*fifthOfWidth), canvas.height-150, 50, 100);

    //create level instance and return it
    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel
}

function JHLevelOne(canvas){
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
    let plat1 = new Platform(0, canvas.height-50, canvas.width/4, 50);
    let plat2 = new Platform(canvas.width/2+440, canvas.height-50, canvas.width/8 +10, 50);
    let plat3 = new Platform(canvas.width/4+250,canvas.height-50, 250, 20, 'kill');
    platforms.push(leftWall, rightWall, plat1, plat2,plat3);

    //coins
    let coin1 = new Coin(3*fifthOfWidth, canvas.height-150);
    let coin2 = new Coin(3*fifthOfWidth-100, canvas.height-200);
    let coin3 = new Coin(3*fifthOfWidth-50, canvas.height-200);
    let coin4 = new Coin(3*fifthOfWidth+50, canvas.height-150);

    coins.push(coin1, coin2, coin3, coin4);
    coinsCount = coins.length;

    //powerups
    let pow1 = new Powerup(fifthOfWidth, canvas.height-100, "invincible");


    powerups.push(pow1);

    //key to unlock endpoint
    key = new Key(canvas.width*0.5, canvas.height*0.60);

    //game endpoint
    endpoint = new Endpoint((4*fifthOfWidth)+(0.5*fifthOfWidth), canvas.height-150, 50, 100);

    //create level instance and return it
    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel;
}

function loadLevelDylanOne(canvas){

    let width = canvas.width;
    let height = canvas.height;

    let player, platforms, powerups, coins, endpoint, coinsCount, key;

    player = new Player(width/8, height/2);

    platforms = []
    let platform1 = new Platform(0, canvas.height-100, width, 100);
    let platform2 = new Platform(canvas.width/3 + 150, canvas.height-250, 250, 25, 'kill')
    platforms.push(platform1, platform2);

    powerups = []
    let pow1 = new Powerup(915,platform1.y -50, 'invincible');
    powerups.push(pow1);

    coins = []
    let coin1 = new Coin(platform2.x +50,platform2.y-50);
    let coin2 = new Coin(platform2.x +200,platform2.y-50);
    let coin3 = new Coin(650,platform1.y -50);
    let coin4 = new Coin(1250,platform1.y -50);
    coins.push(coin1,coin2,coin3,coin4);

    endpoint = new Endpoint(player.x + 1400, platform1.y-100);

    coinsCount = coins.length;

    key = new Key(platform2.x + 110, platform2.y-70)

    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel;
}

function loadLevelDylanTwo(canvas){

    let width = canvas.width;
    let height = canvas.height;

    let player, platforms, powerups, coins, endpoint, coinsCount, key;

    player = new Player(width/8, height/2);

    platforms = []
    let platform1 = new Platform(0, height-100, 500, 50);
    let platform2 = new Platform(1400, 400, 300, 50);
    let platform3 = new Platform(650, height-250, 200, 50);
    let platform4 = new Platform(300, height-425, 300, 50);
    let platform5 = new Platform(850, 400, 150, 50, 'kill');
    let platform6 = new Platform(1125, 400, 150, 50);
    platforms.push(platform1, platform2, platform3, platform4, platform5, platform6);

    powerups = []
    let pow1 = new Powerup(450,platform4.y-60,'jump');
    let pow2 = new Powerup(700, 200, 'invincible');
    powerups.push(pow1,pow2);

    coins = []
    let coin1 = new Coin(platform1.x + 400,platform1.y-40);
    let coin2 = new Coin(platform2.x + 100,platform2.y-40);
    let coin3 = new Coin(platform3.x + 150,platform3.y-40);
    let coin4 = new Coin(450, 200);
    let coin5 = new Coin(800,250);
    let coin6 = new Coin(platform6.x + 75, platform6.y-40);
    coins.push(coin1,coin2,coin3,coin4,coin5,coin6);

    endpoint = new Endpoint(player.x + 1400, 300);

    coinsCount = coins.length;

    key = new Key(platform5.x +60, platform5.y-50)

    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel;
}

function loadLevelDylanThree(canvas){

    let width = canvas.width;
    let height = canvas.height;

    let player, platforms, powerups, coins, endpoint, coinsCount, key;

    player = new Player(width/8, height/2);

    platforms = []
    let platform1 = new Platform(0, canvas.height-100, 365, 100);
    let platform2 = new Platform(175,200,15,575,'kill');
    let platform3 = new Platform(350,200,15,641,'kill');
    let platform4 = new Platform(175,550,50,15,'kill');
    let platform5 = new Platform(300,700,50,15,'kill');
    let platform6 = new Platform(275,350,75,15,'kill');
    let platform7 = new Platform(0,0,190,200);
    let platform8 = new Platform(700,450,350,15);
    let platform9 = new Platform(400,height-150,190,15);
    let platform10 = new Platform(500,0,15,575);
    let platform11 = new Platform(1200,200,100,1000,'kill');
    let platform12 = new Platform(player.x + 1400, platform1.y,50,15);

    platforms.push(platform1,platform2,platform3,platform4,platform5,platform6,platform7,platform9,platform10,platform8,platform11,platform12);
    

    powerups = []
    let pow1 = new Powerup(80, platform1.y-60, 'fly');
    let pow2 = new Powerup(275, 200, 'jump'); 
    powerups.push(pow1,pow2);

    coins = []
    let coin1 = new Coin(80,250);
    let coin2 = new Coin(platform8.x + 100,platform8.y-50);
    let coin3 = new Coin(platform8.x + 250,platform8.y-50);
    let coin4 = new Coin(platform11.x + 250,250);
    let coin5 = new Coin(platform11.x + 350,550);
    coins.push(coin1,coin2,coin3,coin4,coin5);

    endpoint = new Endpoint(player.x + 1400, platform1.y-100);

    coinsCount = coins.length;

    key = new Key(platform11.x + 35, platform11.y -150);

    let theLevel = new Level(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key);
    return theLevel;
}